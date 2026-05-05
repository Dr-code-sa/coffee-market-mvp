"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  categories,
  brands,
  equipmentTypes,
  conditions,
  cities,
} from "@/lib/options";

export default function AddListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    category: "",
    brand: "",
    equipment_type: "",
    condition: "",
    city: "",
    price: "",
    phone: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploadImage = async () => {
    if (!imageFile) return "";

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("listing-images")
      .upload(fileName, imageFile);

    if (error) {
      console.error(error);
      throw error;
    }

    const { data } = supabase.storage
      .from("listing-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage();

      const title = `${form.brand} - ${form.equipment_type}`;

      const { error } = await supabase.from("listings").insert([
        {
          title,
          category: form.category,
          brand: form.brand,
          equipment_type: form.equipment_type,
          condition: form.condition,
          city: form.city,
          price: form.price,
          phone: form.phone,
          notes: form.notes,
          image_url: imageUrl,
        },
      ]);

      if (error) throw error;

      router.push("/listings");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء حفظ الإعلان");
    } finally {
      setLoading(false);
    }
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

      <h1 style={{ marginTop: 30 }}>أضف إعلانك</h1>
      <p>اختر بيانات المعدة من القوائم، وأضف السعر والصورة ورقم الجوال.</p>

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
          <option value="">اختر الحالة</option>
          {conditions.map((x) => <option key={x}>{x}</option>)}
        </select>

        <select name="city" onChange={handleChange} required style={inputStyle}>
          <option value="">اختر المدينة</option>
          {cities.map((x) => <option key={x}>{x}</option>)}
        </select>

        <input
          name="price"
          placeholder="السعر"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="phone"
          placeholder="رقم الجوال مثال: 5XXXXXXXX"
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

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          required
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
          {loading ? "جاري الحفظ..." : "نشر الإعلان"}
        </button>
      </form>
    </main>
  );
}