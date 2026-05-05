"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  created_at: string;
};

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setListings(data || []);
      }

      setLoading(false);
    }

    fetchListings();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 8%",
        direction: "rtl",
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(135deg, #020617, #111827)",
        color: "white",
      }}
    >
      <Link href="/" style={{ color: "#d1d5db", textDecoration: "none" }}>
        ← رجوع للرئيسية
      </Link>

      <header style={{ marginTop: 30, marginBottom: 35 }}>
        <h1 style={{ fontSize: 38, marginBottom: 10 }}>تصفح معدات القهوة</h1>
        <p style={{ color: "#9ca3af" }}>
          الإعلانات المنشورة فقط بعد مراجعتها من إدارة المنصة.
        </p>

        <Link
          href="/add-listing"
          style={{
            display: "inline-block",
            marginTop: 20,
            background: "#f59e0b",
            color: "#111827",
            padding: "12px 18px",
            borderRadius: 10,
            textDecoration: "none",
            fontWeight: 800,
          }}
        >
          + أضف إعلان جديد
        </Link>
      </header>

      {loading ? (
        <p>جاري تحميل الإعلانات...</p>
      ) : listings.length === 0 ? (
        <div
          style={{
            background: "#111827",
            border: "1px solid #1f2937",
            borderRadius: 18,
            padding: 28,
            color: "#d1d5db",
          }}
        >
          لا توجد إعلانات منشورة حاليًا.
        </div>
      ) : (
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 22,
          }}
        >
          {listings.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#111827",
                border: "1px solid #1f2937",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 14px 35px rgba(0,0,0,0.35)",
              }}
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: 210,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              )}

              <div style={{ padding: 22 }}>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(245,158,11,0.12)",
                    color: "#f59e0b",
                    padding: "6px 10px",
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {item.category}
                </div>

                {item.is_verified && (
                  <div
                    style={{
                      display: "inline-block",
                      background: "rgba(34,197,94,0.12)",
                      color: "#22c55e",
                      padding: "6px 10px",
                      borderRadius: 999,
                      fontSize: 13,
                      fontWeight: 700,
                      marginRight: 8,
                      marginBottom: 10,
                    }}
                  >
                    إعلان موثق
                  </div>
                )}

                <h2 style={{ margin: "10px 0", fontSize: 22 }}>
                  {item.brand} - {item.equipment_type}
                </h2>

                <p
                  style={{
                    color: "#f59e0b",
                    fontWeight: 900,
                    fontSize: 22,
                    margin: "12px 0",
                  }}
                >
                  {item.price} ريال
                </p>

                <p style={{ color: "#d1d5db" }}>📍 المدينة: {item.city}</p>
                <p style={{ color: "#d1d5db" }}>⚙️ الحالة: {item.condition}</p>

                {item.notes && (
                  <p style={{ color: "#9ca3af", lineHeight: 1.7 }}>
                    {item.notes}
                  </p>
                )}

                <a
                  href={`https://wa.me/966${item.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: 16,
                    background: "#22c55e",
                    color: "white",
                    padding: "12px",
                    borderRadius: 10,
                    textDecoration: "none",
                    fontWeight: 800,
                  }}
                >
                  تواصل واتساب
                </a>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}