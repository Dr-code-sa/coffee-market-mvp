import Link from "next/link";

export default function AddRequestPage() {
  return (
    <main style={{ padding: 40, direction: "rtl", fontFamily: "Arial" }}>
      <Link href="/">← رجوع للرئيسية</Link>

      <h1 style={{ marginTop: 30 }}>أضف طلبك</h1>
      <p>هنا يستطيع المشتري كتابة المعدة التي يبحث عنها.</p>
    </main>
  );
}