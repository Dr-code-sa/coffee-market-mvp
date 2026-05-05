import Link from "next/link";

export default function Home() {
  return (
    <main style={{ fontFamily: "Arial, sans-serif", direction: "rtl" }}>
      <section
        style={{
          minHeight: "100vh",
          padding: "60px 8%",
          background: "linear-gradient(135deg, #111827, #3b2f2f)",
          color: "white",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 90,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 20 }}>☕ سوق معدات القهوة</h2>

          <Link
            href="/add-listing"
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              border: "1px solid white",
              background: "transparent",
              color: "white",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            أضف إعلان
          </Link>
        </header>

        <div style={{ maxWidth: 900, marginRight: "auto" }}>
          <p style={{ color: "#d1d5db", fontSize: 18 }}>
            منصة مبدئية متخصصة في بيع وشراء معدات القهوة للمطاعم والكافيهات
          </p>

          <h1
            style={{
              fontSize: 54,
              lineHeight: 1.25,
              margin: "20px 0",
              fontWeight: 900,
            }}
          >
            بيع وشراء معدات القهوة بثقة ووضوح
          </h1>

          <p style={{ fontSize: 21, lineHeight: 1.9, color: "#e5e7eb" }}>
            نساعد أصحاب الكافيهات ورواد الأعمال على الوصول إلى معدات قهوة جديدة
            أو مستعملة مع صور حقيقية، أسعار واضحة، وتواصل مباشر عبر واتساب.
          </p>

          <div
            style={{
              marginTop: 35,
              display: "flex",
              gap: 15,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/listings"
              style={{
                padding: "14px 26px",
                borderRadius: 10,
                border: "none",
                background: "#f59e0b",
                color: "#111827",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              تصفح المعدات
            </Link>

            <Link
              href="/add-listing"
              style={{
                padding: "14px 26px",
                borderRadius: 10,
                border: "1px solid #d1d5db",
                background: "transparent",
                color: "white",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              أضف إعلانك
            </Link>

            <Link
              href="/add-request"
              style={{
                padding: "14px 26px",
                borderRadius: 10,
                border: "1px solid #f59e0b",
                background: "transparent",
                color: "#f59e0b",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              أضف طلبك
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: "70px 8%", background: "#f9fafb" }}>
        <h2 style={{ fontSize: 34, marginBottom: 30, color: "#111827" }}>
          لماذا هذه المنصة؟
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 22,
          }}
        >
          {[
            ["صور حقيقية", "كل إعلان يجب أن يحتوي على صور واضحة للمعدة."],
            ["سعر واضح", "لا نقبل الإعلانات بدون سعر معلن."],
            ["تواصل مباشر", "تواصل سريع مع البائع عبر واتساب."],
            ["مراجعة يدوية", "الإعلانات تُراجع قبل عرضها للحفاظ على الجودة."],
          ].map(([title, text]) => (
            <div
              key={title}
              style={{
                background: "white",
                padding: 26,
                borderRadius: 16,
                boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
              }}
            >
              <h3 style={{ color: "#111827", fontSize: 22 }}>{title}</h3>
              <p style={{ color: "#4b5563", lineHeight: 1.8 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}