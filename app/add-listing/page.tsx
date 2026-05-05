"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    price: "",
    city: "",
    condition: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("listings").insert([form]);

    setLoading(false);

    if (error) {
      alert("حدث خطأ أثناء حفظ الإعلان");
      console.error(error);
      return;
    }

    router.push("/listings");
  };

  return (
    <main style={{ padding: 40, direction: "rtl", fontFamily: "Arial" }}>
      <Link href="/">← رجوع للرئيسية</Link>

      <h1 style={{ marginTop: 30 }}>أضف إعلانك</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: 30,
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <input name="title" placeholder="اسم المعدة" onChange={handleChange} required />
        <input name="price" placeholder="السعر" onChange={handleChange} required />
        <input name="city" placeholder="المدينة" onChange={handleChange} required />
        <input name="condition" placeholder="الحالة" onChange={handleChange} required />
        <input name="phone" placeholder="رقم الجوال" onChange={handleChange} required />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 12,
            background: "#f59e0b",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "جاري الحفظ..." : "نشر الإعلان"}
        </button>
      </form>
    </main>
  );
}