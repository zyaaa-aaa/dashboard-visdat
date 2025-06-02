"use client";

import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { indoGeoJson, provinceData, provinceMapping } from "../data/data";

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

const getProvinceData = (geojsonProvinceName) => {
  // Cari berdasarkan mapping
  const dataId = Object.keys(provinceMapping).find(
    key => provinceMapping[key] === geojsonProvinceName
  );
  
  if (dataId) {
    return provinceData.find(p => p.id === dataId);
  }
  
  // Fallback: cari berdasarkan nama langsung
  return provinceData.find(p => 
    p.name.toLowerCase() === geojsonProvinceName.toLowerCase()
  );
};

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
        ? "#881011"
        : value > 6
        ? "#B61516"
        : value > 4
        ? "#E31A1C"
        : value > 3
        ? "#E94849"
        : value > 2
        ? "#EE7677"
        : "#F4A3A4";
    } else if (selectedMetric === "povertySum") {
      return value > 3000000
        ? "#881011"
        : value > 1000000
        ? "#B61516"
        : value > 500000
        ? "#E31A1C"
        : value > 200000
        ? "#E94849"
        : value > 100000
        ? "#EE7677"
        : "#F4A3A4";
    } else if (selectedMetric === "kipkRecipients") {
      // kipkRecipients
      return value > 50000
        ? "#20964B"
        : value > 20000
        ? "#28BC5E"
        : value > 10000
        ? "#53C97E"
        : value > 5000
        ? "#7ED79E"
        : value > 2000
        ? "#A9E4BF"
        : "#BFEBCF";
    } else if (selectedMetric === "students") {
    // Pewarnaan untuk jumlah mahasiswa
    return value > 1000000
      ? "#005BAA"
      : value > 500000
      ? "#0072D5"
      : value > 200000
      ? "#338EDD"
      : value > 100000
      ? "#66AAE6"
      : value > 50000
      ? "#99C7EE"
      : "#B3D5F2";
  }
  return "#ccc";
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

  const onEachFeature = (feature, layer) => {
    const provinceName = feature.properties.Propinsi;
    const provinceData = getProvinceData(provinceName);
    
    if (provinceData) {
      const color = getColor(provinceData.dropoutRate);
      layer.setStyle({
        fillColor: color,
        fillOpacity: 0.7,
        color: '#000',
        weight: 1
      });
      
      // Tooltip
      layer.bindTooltip(`
        <strong>${provinceData.name}</strong><br/>
        Tingkat Putus Kuliah: ${provinceData.dropoutRate}%<br/>
        Mahasiswa: ${provinceData.students.toLocaleString()}<br/>
        Penerima KIP-K: ${provinceData.kipkRecipients.toLocaleString()}
      `);
    } else {
      // Style default untuk provinsi yang tidak ada datanya
      layer.setStyle({
        fillColor: '#cccccc',
        fillOpacity: 0.5,
        color: '#000', 
        weight: 1
      });
      
      layer.bindTooltip(`
        <strong>${provinceName}</strong><br/>
        <em>Data tidak tersedia</em>
      `);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Memuat peta...</div>;
  }

  if (!geoData) {
    return (
      <div className="text-center py-10 text-negative">
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
        <MapUpdater center={[-2.5489, 118.0149]} zoom={4} />
      </MapContainer>

      {/* Kontrol untuk memilih metrik */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-background/60 p-3 rounded-lg shadow-md">
        <h3 className="font-bold mb-2">Pilih Metrik:</h3>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="metric"
              checked={selectedMetric === "dropoutRate"}
              onChange={() => setSelectedMetric("dropoutRate")}
              className="text-muted-foreground"
            />
            <span>Tingkat Dropout (%)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="metric"
              checked={selectedMetric === "students"}
              onChange={() => setSelectedMetric("students")}
              className="text-blue-500"
            />
            <span>Jumlah Mahasiswa</span>
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
      <div className="absolute bottom-4 right-4 z-[1000] bg-background p-3 rounded-lg shadow-md">
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
        {selectedMetric === "students" && (
          <div className="flex flex-col space-y-1">
            {[
              ">1jt",
              "500rb-1jt",
              "200-500rb",
              "100-200rb",
              "50-100rb",
              "<50rb",
            ].map((label, i) => (
              <div key={label} className="flex items-center">
                <div
                  className="w-4 h-4 mr-2"
                  style={{
                    backgroundColor: getColor(
                      [1200000, 700000, 300000, 150000, 70000, 20000][i]
                    ),
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
        <div className="flex flex-col gap-3 absolute top-4 right-4 z-[1000] bg-background p-4 rounded-lg shadow-md max-w-xs">
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
