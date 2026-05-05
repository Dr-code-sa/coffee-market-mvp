"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Listing = {
  id: string;
  title: string;
  price: string;
  city: string;
  condition: string;
  phone: string;
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
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 45,
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <Link
            href="/"
            style={{
              color: "#d1d5db",
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            ← رجوع للرئيسية
          </Link>

          <h1 style={{ marginTop: 20, marginBottom: 8, fontSize: 38 }}>
            تصفح معدات القهوة
          </h1>

          <p style={{ color: "#9ca3af", margin: 0 }}>
            معدات قهوة جديدة ومستعملة مع أسعار واضحة وتواصل مباشر.
          </p>
        </div>

        <Link
          href="/add-listing"
          style={{
            background: "#f59e0b",
            color: "#111827",
            padding: "13px 20px",
            borderRadius: 10,
            textDecoration: "none",
            fontWeight: 800,
          }}
        >
          + أضف إعلان جديد
        </Link>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 22,
        }}
      >
        {loading ? (
          <p style={{ color: "#d1d5db" }}>جاري تحميل الإعلانات...</p>
        ) : listings.length === 0 ? (
          <div
            style={{
              background: "#111827",
              border: "1px solid #1f2937",
              borderRadius: 18,
              padding: 30,
              color: "#d1d5db",
            }}
          >
            لا توجد إعلانات حتى الآن.
          </div>
        ) : (
          listings.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#111827",
                border: "1px solid #1f2937",
                borderRadius: 18,
                padding: 24,
                color: "white",
                boxShadow: "0 14px 35px rgba(0,0,0,0.35)",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(245, 158, 11, 0.12)",
                  color: "#f59e0b",
                  padding: "6px 10px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 700,
                  marginBottom: 15,
                }}
              >
                إعلان تمت مراجعته
              </div>

              <h2
                style={{
                  margin: "0 0 12px",
                  fontSize: 24,
                  lineHeight: 1.4,
                }}
              >
                {item.title}
              </h2>

              <p
                style={{
                  color: "#f59e0b",
                  fontWeight: 900,
                  fontSize: 22,
                  margin: "0 0 18px",
                }}
              >
                {item.price} ريال
              </p>

              <div
                style={{
                  display: "grid",
                  gap: 10,
                  marginBottom: 20,
                  color: "#d1d5db",
                  fontSize: 15,
                }}
              >
                <p style={{ margin: 0 }}>📍 المدينة: {item.city}</p>
                <p style={{ margin: 0 }}>⚙️ الحالة: {item.condition}</p>
              </div>

              <a
                href={`https://wa.me/966${item.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "#22c55e",
                  color: "white",
                  padding: "12px 16px",
                  borderRadius: 10,
                  textDecoration: "none",
                  fontWeight: 800,
                }}
              >
                تواصل واتساب
              </a>
            </div>
          ))
        )}
      </section>
    </main>
  );
}