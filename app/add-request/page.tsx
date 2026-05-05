"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  categories,
  brands,
  equipmentTypes,
  conditions,
  cities,
} from "@/lib/options";

export default function AddRequestPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    category: "",
    brand: "",
    equipment_type: "",
    condition: "",
    city: "",
    budget: "",
    phone: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("requests").insert([form]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("حدث خطأ أثناء حفظ الطلب");
      return;
    }

    alert("تم إرسال طلبك بنجاح");
  };

  const inputStyle = {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #d1d5db",
    fontSize: 15,
  };

  return (
    <main style={{ padding: 40, direction: "rtl", fontFamily: "Arial" }}>
      <Link href="/">← رجوع للرئيسية</Link>

      <h1 style={{ marginTop: 30 }}>أضف طلبك</h1>
      <p>اكتب ما تبحث عنه وسنتيح الطلب لاحقًا للبائعين.</p>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: 30,
          maxWidth: 520,
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <select name="category" onChange={handleChange} required style={inputStyle}>
          <option value="">اختر التصنيف</option>
          {categories.map((x) => <option key={x}>{x}</option>)}
        </select>

        <select name="brand" onChange={handleChange} required style={inputStyle}>
          <option value="">اختر الشركة / العلامة</option>
          {brands.map((x) => <option key={x}>{x}</option>)}
        </select>

        <select name="equipment_type" onChange={handleChange} required style={inputStyle}>
          <option value="">اختر نوع المعدة</option>
          {equipmentTypes.map((x) => <option key={x}>{x}</option>)}
        </select>

        <select name="condition" onChange={handleChange} required style={inputStyle}>
          <option value="">الحالة المطلوبة</option>
          {conditions.map((x) => <option key={x}>{x}</option>)}
        </select>

        <select name="city" onChange={handleChange} required style={inputStyle}>
          <option value="">اختر المدينة</option>
          {cities.map((x) => <option key={x}>{x}</option>)}
        </select>

        <input
          name="budget"
          placeholder="الميزانية المتوقعة"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="phone"
          placeholder="رقم الجوال"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <textarea
          name="notes"
          placeholder="ملاحظات إضافية"
          onChange={handleChange}
          rows={4}
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 14,
            background: "#f59e0b",
            border: "none",
            borderRadius: 10,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "جاري الحفظ..." : "إرسال الطلب"}
        </button>
      </form>
    </main>
  );
}