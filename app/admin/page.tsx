"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Listing = {
  id: string;
  title: string;
  category: string;
  brand: string;
  equipment_type: string;
  condition: string;
  city: string;
  price: string;
  phone: string;
  notes: string;
  image_url: string;
  status: string;
  is_verified: boolean;
  admin_note: string;
  created_at: string;
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  const ADMIN_PIN = "1234"; // غيّره لاحقًا

  async function fetchListings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setListings(data || []);
    else console.error(error);

    setLoading(false);
  }

  useEffect(() => {
    if (authenticated) fetchListings();
  }, [authenticated]);

  function login() {
    if (pin === ADMIN_PIN) {
      setAuthenticated(true);
    } else {
      alert("رمز الدخول غير صحيح");
    }
  }

  async function updateListing(
    id: string,
    updates: Partial<Listing>
  ) {
    const { error } = await supabase
      .from("listings")
      .update(updates)
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("حدث خطأ أثناء التحديث");
      return;
    }

    fetchListings();
  }

  if (!authenticated) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#020617",
          color: "white",
          direction: "rtl",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            width: 360,
            background: "#111827",
            padding: 30,
            borderRadius: 18,
            border: "1px solid #1f2937",
          }}
        >
          <h1>لوحة الأدمن</h1>
          <p style={{ color: "#9ca3af" }}>أدخل رمز الدخول</p>

          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="رمز الدخول"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #374151",
              marginBottom: 15,
            }}
          />

          <button
            onClick={login}
            style={{
              width: "100%",
              padding: 12,
              background: "#f59e0b",
              border: "none",
              borderRadius: 8,
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            دخول
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 6%",
        background: "#020617",
        color: "white",
        direction: "rtl",
        fontFamily: "Arial",
      }}
    >
      <h1>لوحة إدارة الإعلانات</h1>
      <p style={{ color: "#9ca3af" }}>
        مراجعة الإعلانات، نشرها، تمييز الموثوق، أو رفض الإعلانات الضعيفة.
      </p>

      {loading ? (
        <p>جاري التحميل...</p>
      ) : (
        listings.map((item) => (
          <div
            key={item.id}
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: 20,
              background: "#111827",
              border: "1px solid #1f2937",
              borderRadius: 18,
              padding: 20,
              marginTop: 20,
            }}
          >
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.title}
                style={{
                  width: "100%",
                  height: 170,
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
            ) : (
              <div
                style={{
                  height: 170,
                  background: "#1f2937",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#9ca3af",
                }}
              >
                بدون صورة
              </div>
            )}

            <div>
              <h2 style={{ marginTop: 0 }}>
                {item.brand} - {item.equipment_type}
              </h2>

              <p>التصنيف: {item.category}</p>
              <p>المدينة: {item.city}</p>
              <p>الحالة: {item.condition}</p>
              <p>السعر: {item.price} ريال</p>
              <p>الجوال: {item.phone}</p>
              <p style={{ color: "#9ca3af" }}>
                الملاحظات: {item.notes || "لا يوجد"}
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  onClick={() =>
                    updateListing(item.id, { status: "published" })
                  }
                  style={buttonStyle("#22c55e")}
                >
                  نشر الإعلان
                </button>

                <button
                  onClick={() =>
                    updateListing(item.id, { status: "rejected" })
                  }
                  style={buttonStyle("#ef4444")}
                >
                  رفض الإعلان
                </button>

                <button
                  onClick={() =>
                    updateListing(item.id, {
                      is_verified: !item.is_verified,
                    })
                  }
                  style={buttonStyle("#3b82f6")}
                >
                  {item.is_verified ? "إلغاء التوثيق" : "توثيق الإعلان"}
                </button>
              </div>

              <p style={{ marginTop: 15 }}>
                الحالة الحالية:{" "}
                <strong style={{ color: "#f59e0b" }}>
                  {item.status || "pending"}
                </strong>
              </p>

              <p>
                موثق:{" "}
                <strong style={{ color: item.is_verified ? "#22c55e" : "#ef4444" }}>
                  {item.is_verified ? "نعم" : "لا"}
                </strong>
              </p>
            </div>
          </div>
        ))
      )}
    </main>
  );
}

function buttonStyle(background: string) {
  return {
    padding: "10px 14px",
    background,
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
  };
}