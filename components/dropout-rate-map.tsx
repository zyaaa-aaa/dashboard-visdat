"use client";

import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { indoGeoJson, provinceData } from "../data/data";

// Fix untuk icon Leaflet di Next.js
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Button } from "./ui/button";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

// Komponen untuk mengupdate map ketika data berubah
type MapUpdaterProps = {
  center: [number, number];
  zoom: number;
};

function MapUpdater({ center, zoom }: MapUpdaterProps) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// TODO: resolve all of the type issues
const DropoutRateMap = () => {
  const [geoData, setGeoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState("dropoutRate");
  const [selectedProvince, setSelectedProvince] = useState(null);

  // Membuat mapping dari nama provinsi ke data
  const provinceDataMap = provinceData.reduce<
    Record<string, (typeof provinceData)[number]>
  >((acc, province) => {
    acc[province.name.toLowerCase()] = province;
    return acc;
  }, {});

  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        // GeoJSON untuk provinsi Indonesia
        const data = indoGeoJson;

        // Match antara GeoJSON dan data kita
        const matchedFeatures = data.features.map((feature) => {
          const provinceName = feature.properties.Propinsi;
          const matchedData = provinceDataMap[provinceName.toLowerCase()] || {};
          return {
            ...feature,
            properties: {
              ...feature.properties,
              ...matchedData,
            },
          };
        });

        setGeoData({
          ...data,
          features: matchedFeatures,
        });
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGeoData();
  }, []);

  // Fungsi untuk menentukan warna berdasarkan nilai
  const getColor = (value: number) => {
    if (selectedMetric === "dropoutRate") {
      return value > 8
        ? "#800026"
        : value > 6
        ? "#BD0026"
        : value > 4
        ? "#E31A1C"
        : value > 3
        ? "#FC4E2A"
        : value > 2
        ? "#FD8D3C"
        : "#FEB24C";
    } else if (selectedMetric === "povertySum") {
      return value > 3000000
        ? "#800026"
        : value > 1000000
        ? "#BD0026"
        : value > 500000
        ? "#E31A1C"
        : value > 200000
        ? "#FC4E2A"
        : value > 100000
        ? "#FD8D3C"
        : "#FEB24C";
    } else {
      // kipkRecipients
      return value > 50000
        ? "#800026"
        : value > 20000
        ? "#BD0026"
        : value > 10000
        ? "#E31A1C"
        : value > 5000
        ? "#FC4E2A"
        : value > 2000
        ? "#FD8D3C"
        : "#FEB24C";
    }
  };

  // Style untuk GeoJSON
  const styleFeature = (feature) => {
    const value = feature.properties[selectedMetric] || 0;
    const isSelected =
      selectedProvince &&
      selectedProvince.properties.Propinsi === feature.properties.Propinsi;

    return {
      fillColor: getColor(value),
      weight: isSelected ? 3 : 1,
      opacity: 1,
      color: isSelected ? "#000" : "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  // Event handlers untuk interaktivitas
  const highlightFeature = (e) => {
    const layer = e.target;
    layer.setStyle({
      weight: 3,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7,
    });
    layer.bringToFront();
  };

  const resetHighlight = (e) => {
    const layer = e.target;
    layer.setStyle(styleFeature(layer.feature));
  };

  const onEachFeature = (feature, layer) => {
    const provinceName = feature.properties.Propinsi;
    const dropoutRate = feature.properties.dropoutRate || 0;
    const povertySum = feature.properties.povertySum || 0;
    const kipkRecipients = feature.properties.kipkRecipients || 0;
    const students = feature.properties.students || 0;

    layer.bindTooltip(
      `<div style="min-width: 200px">
      <strong>${provinceName}</strong><br/>
      Dropout Rate: <b>${dropoutRate.toFixed(2)}%</b><br/>
      Jumlah Penduduk Miskin: <b>${povertySum.toLocaleString()}</b><br/>
      Penerima KIPK: <b>${kipkRecipients.toLocaleString()}</b><br/>
      Jumlah Siswa: <b>${students.toLocaleString()}</b>
      </div>`,
      { permanent: false, sticky: true }
    );

    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: () => {
        setSelectedProvince(feature);
      },
    });
  };

  if (loading) {
    return <div className="text-center py-10">Memuat peta...</div>;
  }

  if (!geoData) {
    return (
      <div className="text-center py-10 text-red-500">
        Gagal memuat data peta.
      </div>
    );
  }

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[-2.5489, 118.0149]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            style={styleFeature}
            onEachFeature={onEachFeature}
          />
        )}
        <MapUpdater center={[-2.5489, 118.0149]} zoom={5} />
      </MapContainer>

      {/* Kontrol untuk memilih metrik */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white p-3 rounded-lg shadow-md">
        <h3 className="font-bold mb-2">Pilih Metrik:</h3>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="metric"
              checked={selectedMetric === "dropoutRate"}
              onChange={() => setSelectedMetric("dropoutRate")}
              className="text-blue-500"
            />
            <span>Tingkat Dropout (%)</span>
          </label>
          <label className="flex items-center space-x-2  cursor-pointer">
            <input
              type="radio"
              name="metric"
              checked={selectedMetric === "povertySum"}
              onChange={() => setSelectedMetric("povertySum")}
              className="text-blue-500"
            />
            <span>Jumlah Penduduk Miskin</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="metric"
              checked={selectedMetric === "kipkRecipients"}
              onChange={() => setSelectedMetric("kipkRecipients")}
              className="text-blue-500"
            />
            <span>Penerima KIPK</span>
          </label>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white p-3 rounded-lg shadow-md">
        <h3 className="font-bold mb-2">Legenda</h3>
        {selectedMetric === "dropoutRate" && (
          <div className="flex flex-col space-y-1">
            {[">8%", "6-8%", "4-6%", "3-4%", "2-3%", "<2%"].map((label, i) => (
              <div key={label} className="flex items-center">
                <div
                  className="w-4 h-4 mr-2"
                  style={{
                    backgroundColor: getColor([9, 7, 5, 3.5, 2.5, 1][i]),
                  }}
                />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        )}
        {selectedMetric === "povertySum" && (
          <div className="flex flex-col space-y-1">
            {[
              ">3jt",
              "1-3jt",
              "500rb-1jt",
              "200-500rb",
              "100-200rb",
              "<100rb",
            ].map((label, i) => (
              <div key={label} className="flex items-center">
                <div
                  className="w-4 h-4 mr-2"
                  style={{
                    backgroundColor: getColor(
                      [4000000, 2000000, 750000, 350000, 150000, 50000][i]
                    ),
                  }}
                />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        )}
        {selectedMetric === "kipkRecipients" && (
          <div className="flex flex-col space-y-1">
            {[">50rb", "20-50rb", "10-20rb", "5-10rb", "2-5rb", "<2rb"].map(
              (label, i) => (
                <div key={label} className="flex items-center">
                  <div
                    className="w-4 h-4 mr-2"
                    style={{
                      backgroundColor: getColor(
                        [60000, 35000, 15000, 7500, 3500, 1000][i]
                      ),
                    }}
                  />
                  <span className="text-sm">{label}</span>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Info Provinsi Terpilih */}
      {selectedProvince && (
        <div className="flex flex-col gap-3 absolute top-4 right-4 z-[1000] bg-white p-4 rounded-lg shadow-md max-w-xs">
          <h3 className="font-bold text-lg">
            {selectedProvince.properties.Propinsi}
          </h3>
          <div className="flex flex-col gap-0.5">
            <p>
              <span className="">Dropout Rate:</span>{" "}
              <span className="font-semibold">
                {selectedProvince.properties.dropoutRate?.toFixed(2) || "N/A"}%
              </span>
            </p>
            <p>
              <span className="">Penduduk Miskin:</span>{" "}
              <span className="font-semibold">
                {selectedProvince.properties.povertySum?.toLocaleString() ||
                  "N/A"}
              </span>
            </p>
            <p>
              <span className="">Penerima KIPK:</span>{" "}
              <span className="font-semibold">
                {selectedProvince.properties.kipkRecipients?.toLocaleString() ||
                  "N/A"}
              </span>
            </p>
            <p>
              <span className="">Jumlah Siswa:</span>{" "}
              <span className="font-semibold">
                {selectedProvince.properties.students?.toLocaleString() ||
                  "N/A"}
              </span>
            </p>
          </div>
            <Button
            onClick={() => setSelectedProvince(null)}
            variant={"default"}
            style={{ cursor: "pointer" }}
            >
            Tutup
            </Button>
        </div>
      )}
    </div>
  );
};

export default DropoutRateMap;
