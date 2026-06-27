import asyncio
import json

from sqlalchemy import select

from app.database import async_session, create_tables
from app.models.product import Product
from app.models.review import Review


products_data = [
    {
        "slug": "foam-pembersih-sepatu",
        "name": "FLEXLESS Foam Pembersih Sepatu",
        "description": "Foam pembersih sepatu serbaguna dari FLEXLESS. Formulasi busa lembut yang efektif membersihkan kotoran, noda, dan bakteri tanpa merusak warna atau bahan sepatu. Cocok untuk semua jenis sepatu termasuk kulit, suede, kanvas, mesh, dan sintetis. Mengandung formula anti bakteri yang menjaga sepatu tetap segar.",
        "price": 49000,
        "rating": 4.9,
        "sold_count": 660,
        "category": "cleaner",
        "stock": 50,
        "is_active": True,
    },
    {
        "slug": "cairan-pembersih-sepatu",
        "name": "FLEXLESS Cairan Pembersih Sepatu",
        "description": "Cairan pembersih sepatu premium berbentuk liquid yang membersihkan secara mendalam. Formula cair mampu menembus pori-pori bahan untuk mengangkat kotoran yang membandel. Aman untuk semua jenis material sepatu termasuk kulit asli, suede, nubuck, kanvas, dan sintetis.",
        "price": 120000,
        "rating": 5.0,
        "sold_count": 66,
        "category": "cleaner",
        "stock": 30,
        "is_active": True,
    },
    {
        "slug": "sabun-pembersih-sepatu-100ml",
        "name": "FLEXLESS Sabun Pembersih Sepatu 100ml",
        "description": "Sabun pembersih sepatu dalam kemasan praktis 100ml. Formula sabun alami yang lembut namun ampuh membersihkan segala jenis kotoran pada sepatu. Tidak merusak warna, tidak menyebabkan kekuningan, dan aman untuk semua jenis bahan.",
        "price": 36000,
        "rating": 5.0,
        "sold_count": 82,
        "category": "cleaner",
        "stock": 100,
        "is_active": True,
    },
    {
        "slug": "sabun-pembersih-sepatu-250ml",
        "name": "FLEXLESS Sabun Pembersih Sepatu 250ml",
        "description": "Sabun pembersih sepatu ukuran jumbo 250ml untuk perawatan sepatu yang lebih hemat. Formula premium NON DETERGENT yang tidak merusak bahan, warna, dan tidak menyebabkan warna kekuningan. Efektif membersihkan sepatu, tas, topi, dan barang kulit lainnya.",
        "price": 58000,
        "rating": 5.0,
        "sold_count": 32,
        "category": "cleaner",
        "stock": 80,
        "is_active": True,
    },
    {
        "slug": "premium-shoe-cleaner-conditioner-250ml",
        "name": "FLEXLESS Premium Shoe Cleaner & Conditioner 250ml",
        "description": "Sabun pembersih sepatu premium FLEXLESS dalam kemasan 250ml. Cleaner & Conditioner dalam satu produk yang membersihkan sekaligus merawat bahan sepatu. Formula NON DETERGENT yang tidak merusak warna.",
        "price": 98000,
        "rating": 4.9,
        "sold_count": 44,
        "category": "cleaner",
        "stock": 40,
        "is_active": True,
    },
    {
        "slug": "foam-pembersih-sepatu-premium",
        "name": "FLEXLESS Foam Pembersih Sepatu Premium",
        "description": "Foam cleaner premium dari FLEXLESS dengan formula yang lebih konsentrasi. Membersihkan sepatu secara instan tanpa perlu bilas. Formulasi busa tebal yang menembus pori-pori bahan untuk mengangkat kotoran terdalam.",
        "price": 70000,
        "rating": 4.9,
        "sold_count": 139,
        "category": "cleaner",
        "stock": 50,
        "is_active": True,
    },
    {
        "slug": "stain-remover-pembersih-noda-kain",
        "name": "FLEXLESS Stain Remover Pembersih Noda Kain",
        "description": "Penghilang noda khusus untuk noda pada sepatu berbahan kain, kanvas, dan sintetis. Formula ampuh yang mengangkat noda tanpa merusak serat atau warna kain. Efektif menghilangkan noda lumpur, makanan, tinta, dan noda membandel lainnya.",
        "price": 83000,
        "rating": 4.9,
        "sold_count": 467,
        "category": "treatment",
        "stock": 40,
        "is_active": True,
    },
    {
        "slug": "stain-remover-pembersih-noda-berat-rubber",
        "name": "FLEXLESS Stain Remover Pembersih Noda Berat Rubber",
        "description": "Pembersih noda berat khusus untuk material rubber, sole, dan midsole. Formulasi khusus yang mampu mengangkat noda bandel, scuff marks, dan kotoran yang sudah mengering pada bagian sol sepatu.",
        "price": 38000,
        "rating": 4.5,
        "sold_count": 29,
        "category": "treatment",
        "stock": 30,
        "is_active": True,
    },
    {
        "slug": "pelembab-tas-kulit-anti-jamur",
        "name": "FLEXLESS Pelembab Tas Kulit Anti Jamur (Leather Balsam)",
        "description": "Leather Balsam premium untuk perawatan barang-barang kulit. Melembabkan, melindungi, dan mencegah jamur pada kulit. Cocok untuk tas, jaket kulit, sepatu kulit, dan aksesoris kulit lainnya.",
        "price": 83000,
        "rating": 5.0,
        "sold_count": 388,
        "category": "treatment",
        "stock": 35,
        "is_active": True,
    },
    {
        "slug": "unyellowing-pemutih-sepatu",
        "name": "FLEXLESS Unyellowing Pemutih Sepatu Midsole / Outsole",
        "description": "Pemutih khusus untuk midsole dan outsole sepatu yang menguning. Mengembalikan warna putih pada bagian sol sepatu. Ampuh menghilangkan noda kekuningan akibat pemakaian dan paparan sinar UV.",
        "price": 48000,
        "rating": 4.5,
        "sold_count": 29,
        "category": "treatment",
        "stock": 0,
        "is_active": True,
    },
    {
        "slug": "glue-remover",
        "name": "FLEXLESS Glue Remover Penghilang Lem Sepatu 60ml",
        "description": "Penghilang lem khusus untuk sepatu. Mengangkat sisa lem yang menempel pada sepatu tanpa merusak material. Aman digunakan pada kulit, kanvas, sintetis, dan berbagai jenis bahan sepatu lainnya.",
        "price": 35000,
        "rating": 4.4,
        "sold_count": 21,
        "category": "treatment",
        "stock": 25,
        "is_active": True,
    },
    {
        "slug": "dempul-sepatu-kulit-leather-filler",
        "name": "FLEXLESS Dempul Sepatu Kulit Leather Filler",
        "description": "Dempul atau filler untuk perbaikan permukaan kulit yang tergores, retak, atau rusak. Mengisi dan meratakan permukaan kulit sehingga terlihat seperti baru. Cocok untuk sepatu kulit, tas kulit, jaket kulit, dan barang kulit lainnya.",
        "price": 26000,
        "rating": 5.0,
        "sold_count": 29,
        "category": "treatment",
        "stock": 0,
        "is_active": True,
    },
    {
        "slug": "sikat-pembersih-insole-sepatu",
        "name": "FLEXLESS Sikat Pembersih Insole Sepatu",
        "description": "Sikat khusus untuk membersihkan insole atau sol dalam sepatu. Bentuk yang ergonomis dan ukuran yang pas memudahkan pembersihan bagian dalam sepatu yang sulit dijangkau.",
        "price": 23000,
        "rating": 5.0,
        "sold_count": 92,
        "category": "brush",
        "stock": 60,
        "is_active": True,
    },
    {
        "slug": "standart-brush",
        "name": "FLEXLESS Standart Brush Sikat Pembersih Sepatu",
        "description": "Sikat pembersih sepatu standar dengan bulu nylon berkualitas tinggi. Mengangkat debu dan kotoran dengan efektif. Desain gagang yang nyaman dan ukuran yang pas untuk pembersihan sepatu sehari-hari.",
        "price": 58000,
        "rating": 4.9,
        "sold_count": 32,
        "category": "brush",
        "stock": 40,
        "is_active": True,
    },
    {
        "slug": "premium-brush-sikat-pembersih-sepatu",
        "name": "FLEXLESS Premium Brush Sikat Pembersih Sepatu",
        "description": "Sikat pembersih sepatu premium dengan bulu kuda (horsehair) berkualitas tinggi. Lembut pada material namun efektif mengangkat kotoran. Gagang kayu yang elegan dan nyaman digunakan.",
        "price": 80000,
        "rating": 5.0,
        "sold_count": 14,
        "category": "brush",
        "stock": 25,
        "is_active": True,
    },
    {
        "slug": "premium-brush-small",
        "name": "FLEXLESS Premium Brush Sikat Pembersih Sepatu (Small)",
        "description": "Sikat pembersih sepatu premium ukuran kecil. Praktis untuk dibawa bepergian. Bulu sikat berkualitas tinggi yang lembut namun efektif membersihkan.",
        "price": 38500,
        "rating": 4.9,
        "sold_count": 99,
        "category": "brush",
        "stock": 50,
        "is_active": True,
    },
    {
        "slug": "sikat-suede-nubuck",
        "name": "FLEXLESS Sikat Suede Nubuck Suede Brush & Eraser",
        "description": "Sikat khusus untuk perawatan sepatu suede dan nubuck. Dilengkapi dengan dua sisi: sikat untuk mengangkat kotoran dan penghapus (eraser) untuk menghilangkan noda.",
        "price": 78500,
        "rating": 4.9,
        "sold_count": 158,
        "category": "brush",
        "stock": 35,
        "is_active": True,
    },
    {
        "slug": "parfum-sepatu-anti-bau-60ml",
        "name": "FLEXLESS Shoe Parfume Anti Bau 60ml",
        "description": "Parfum sepatu anti bau dalam kemasan praktis 60ml. Menyegarkan sepatu dan menghilangkan bau tidak sedap. Formula anti bakteri yang tahan lama.",
        "price": 35000,
        "rating": 4.9,
        "sold_count": 253,
        "category": "accessory",
        "stock": 80,
        "is_active": True,
    },
    {
        "slug": "parfum-sepatu-anti-bau-120ml",
        "name": "FLEXLESS Parfum Sepatu Anti Bau Shoe Perfume 120ml",
        "description": "Parfum sepatu anti bau ukuran 120ml. Formula yang sama dengan varian 60ml namun dengan kemasan lebih besar untuk pemakaian lebih hemat.",
        "price": 45000,
        "rating": 4.9,
        "sold_count": 65,
        "category": "accessory",
        "stock": 60,
        "is_active": True,
    },
    {
        "slug": "parfum-sepatu-premium",
        "name": "FLEXLESS Parfum Sepatu Anti Bau Shoe Perfume Premium",
        "description": "Parfum sepatu premium dengan formula anti bakteri lanjutan. Wangi premium yang tahan lama dan kesegaran maksimal. Cocok untuk koleksi sepatu premium.",
        "price": 55000,
        "rating": 4.9,
        "sold_count": 95,
        "category": "accessory",
        "stock": 40,
        "is_active": True,
    },
    {
        "slug": "lap-handuk-sepatu-microfiber",
        "name": "FLEXLESS Lap Handuk Sepatu Microfiber 40x40cm",
        "description": "Lap handuk microfiber premium ukuran 40x40cm. Highly absorbent dan lembut pada permukaan sepatu. Mengangkat debu, air, dan kotoran tanpa meninggalkan serat.",
        "price": 27500,
        "rating": 5.0,
        "sold_count": 233,
        "category": "accessory",
        "stock": 100,
        "is_active": True,
    },
    {
        "slug": "lem-sepatu-super-kuat",
        "name": "FLEXLESS Shoes Care Lem Sepatu Super Kuat",
        "description": "Lem sepatu serbaguna yang sangat kuat untuk merekatkan sol, upper, dan bagian sepatu lainnya. Daya rekat tinggi dan cepat kering. Aman untuk semua jenis material sepatu.",
        "price": 29800,
        "rating": 4.8,
        "sold_count": 1000,
        "category": "accessory",
        "stock": 60,
        "is_active": True,
    },
    {
        "slug": "alat-penjepit-sepatu-f-clamp",
        "name": "FLEXLESS Alat Penjepit Sepatu F Clamp 4 inch",
        "description": "Alat penjepit sepatu (F Clamp) berukuran 4 inch untuk merekatkan sepatu dengan tekanan merata. Memudahkan proses pengeleman sepatu dengan mengunci posisi yang direkatkan.",
        "price": 35000,
        "rating": 4.9,
        "sold_count": 155,
        "category": "accessory",
        "stock": 30,
        "is_active": True,
    },
    {
        "slug": "saddle-shoes-shoe-tree",
        "name": "FLEXLESS Saddle Shoes Shoe Tree Catokan Sepatu",
        "description": "Shoe tree atau catokan sepatu untuk menjaga bentuk sepatu agar tidak kusut dan mempertahankan bentuk asli. Terbuat dari bahan yang kuat dan ringan.",
        "price": 44000,
        "rating": 5.0,
        "sold_count": 93,
        "category": "accessory",
        "stock": 40,
        "is_active": True,
    },
    {
        "slug": "essential-kit-a",
        "name": "FLEXLESS Essential Kit A Foam Pembersih Sepatu Putih",
        "description": "Paket starter untuk perawatan sepatu putih. Mengandung foam pembersih sepatu putih premium dan sikat pembersih. Membersihkan dan memutihkan sepatu putih secara efektif.",
        "price": 125000,
        "rating": 4.8,
        "sold_count": 137,
        "category": "kit",
        "stock": 25,
        "is_active": True,
    },
    {
        "slug": "deluxe-care-kit-a",
        "name": "FLEXLESS Premium Deluxe Care Kit A",
        "description": "Paket lengkap perawatan sepatu FLEXLESS Premium Deluxe Kit. Berisi foam cleaner, sikat premium, microfiber towel, dan parfum sepatu. Hemat lebih banyak dibandingkan beli satuan.",
        "price": 135000,
        "rating": 4.9,
        "sold_count": 306,
        "category": "kit",
        "stock": 20,
        "is_active": True,
    },
    {
        "slug": "starter-combo-series",
        "name": "FLEXLESS Starter Combo Series Foam Cleaner Multifungsi",
        "description": "Combo starter untuk pemula yang berisi foam cleaner multifungsi dan aksesoris penting untuk perawatan sepatu. Cocok untuk yang baru memulai perawatan sepatu.",
        "price": 220000,
        "rating": 5.0,
        "sold_count": 54,
        "category": "kit",
        "stock": 15,
        "is_active": True,
    },
    {
        "slug": "deep-clean-essentials",
        "name": "FLEXLESS Deep Clean Essentials Paket Pembersih Sepatu",
        "description": "Paket deep clean untuk pembersihan mendalam sepatu yang sangat kotor. Berisi cleaner konsentrasi, sikat keras, dan aksesoris pembersih lainnya.",
        "price": 207000,
        "rating": 4.8,
        "sold_count": 8,
        "category": "kit",
        "stock": 15,
        "is_active": True,
    },
    {
        "slug": "travel-pack",
        "name": "FLEXLESS Travel Pack Paket Pembersih Sepatu",
        "description": "Paket perawatan sepatu dalam kemasan travel yang praktis. Berisi cleaner travel size dan aksesoris essential. Cocok untuk dibawa saat traveling.",
        "price": 145000,
        "rating": 5.0,
        "sold_count": 17,
        "category": "kit",
        "stock": 20,
        "is_active": True,
    },
    {
        "slug": "leather-care-kit",
        "name": "FLEXLESS Leather Care Kit Paket Perawatan Kulit",
        "description": "Paket perawatan lengkap untuk barang kulit. Berisi leather balsam, sikat kulit, dan microfiber cloth. Melembabkan, membersihkan, dan melindungi kulit dari jamur.",
        "price": 155000,
        "rating": 5.0,
        "sold_count": 22,
        "category": "kit",
        "stock": 20,
        "is_active": True,
    },
    {
        "slug": "suede-specialist-bundle",
        "name": "FLEXLESS Suede Specialist Bundle",
        "description": "Paket spesialis suede yang berisi suede brush, suede cleaner, dan suede protector. Dirancang khusus untuk perawatan sepatu suede dan nubuck.",
        "price": 139000,
        "rating": 4.9,
        "sold_count": 45,
        "category": "kit",
        "stock": 20,
        "is_active": True,
    },
    {
        "slug": "premium-care-collection",
        "name": "FLEXLESS Premium Care Collection Paket Perawatan Lengkap",
        "description": "Paket perawatan premium paling lengkap dari FLEXLESS. Berisi foam cleaner, liquid cleaner, sikat premium, suede brush, microfiber towel, parfum, dan leather balsam.",
        "price": 298500,
        "rating": 4.9,
        "sold_count": 39,
        "category": "kit",
        "stock": 10,
        "is_active": True,
    },
    {
        "slug": "business-booster-pack",
        "name": "FLEXLESS Business Booster Pack",
        "description": "Paket bisnis untuk usaha shoe care atau laundry sepatu. Berisi produk FLEXLESS dalam quantity besar untuk kebutuhan komersial.",
        "price": 443500,
        "rating": 5.0,
        "sold_count": 14,
        "category": "kit",
        "stock": 10,
        "is_active": True,
    },
    {
        "slug": "sabun-sepatu-hadiah-ulang-tahun",
        "name": "FLEXLESS Sabun Sepatu Hadiah Ulang Tahun",
        "description": "Paket hadiah spesial untuk pecinta sepatu. Berisi sabun pembersih sepatu FLEXLESS dalam kemasan kado yang menarik. Cocok sebagai hadiah ulang tahun.",
        "price": 68000,
        "rating": 5.0,
        "sold_count": 14,
        "category": "kit",
        "stock": 20,
        "is_active": True,
    },
    {
        "slug": "sabun-sepatu-grosir",
        "name": "FLEXLESS Sabun Pembersih Sepatu Cairan Grosir",
        "description": "Sabun pembersih sepatu cairan dalam kemasan grosir. Harga hemat untuk pembelian quantity. Cocok untuk kebutuhan bisnis atau stok produk dalam jumlah banyak.",
        "price": 58000,
        "rating": 5.0,
        "sold_count": 32,
        "category": "cleaner",
        "stock": 50,
        "is_active": True,
    },
]

reviews_data = [
    {"product_slug": "foam-pembersih-sepatu", "rating": 5, "comment": "Busanya banyak dan wangi! Sepatu jadi bersih sempurna. Recommended banget!", "author_name": "Rizky A."},
    {"product_slug": "foam-pembersih-sepatu", "rating": 5, "comment": "Best seller bukan tanpa alasan. Foam ini beneran ampuh buat bersihin sepatu putih. 660 lebih terjual gak bohong!", "author_name": "Diana P."},
    {"product_slug": "stain-remover-pembersih-noda-kain", "rating": 5, "comment": "Noda lumpur di sepatu canvas langsung hilang. Stain remover ini emang the best. 467 terjual, gak heran!", "author_name": "Fajar M."},
    {"product_slug": "pelembab-tas-kulit-anti-jamur", "rating": 5, "comment": "Tas kulit saya yang sudah mulai kusam jadi kinclong lagi setelah pakai leather balsam ini. Anti jamur juga!", "author_name": "Maya S."},
    {"product_slug": "deluxe-care-kit-a", "rating": 5, "comment": "Deluxe kit ini lengkap banget isinya. Harga worth it banget. 306 terjual, emang produk favorit!", "author_name": "Andi K."},
    {"product_slug": "lem-sepatu-super-kuat", "rating": 5, "comment": "Lem sepatu ini beneran kuat! Sepatu saya yang solnya lepas bisa direkatkan lagi sempurna. 1000+ terjual!", "author_name": "Budi H."},
]


async def seed():
    await create_tables()

    async with async_session() as session:
        result = await session.execute(select(Product))
        existing_slugs = {row[0].slug for row in result.scalars().all()}

        added = 0
        for data in products_data:
            if data["slug"] not in existing_slugs:
                product = Product(**data)
                session.add(product)
                added += 1
        await session.commit()

        if added:
            print(f"Added {added} products")

        products_result = await session.execute(select(Product))
        slug_to_id = {p.slug: p.id for p in products_result.scalars().all()}

        reviews_result = await session.execute(select(Review))
        existing_reviews = {(r.product_id, r.author_name) for r in reviews_result.scalars().all()}

        reviews_added = 0
        for data in reviews_data:
            pid = slug_to_id.get(data["product_slug"])
            if pid and (pid, data["author_name"]) not in existing_reviews:
                review = Review(
                    product_id=pid,
                    rating=data["rating"],
                    comment=data["comment"],
                    author_name=data["author_name"],
                    source="shopee",
                )
                session.add(review)
                reviews_added += 1
        await session.commit()

        if reviews_added:
            print(f"Added {reviews_added} reviews")

        count = await session.execute(select(Product))
        print(f"Total products in database: {len(count.scalars().all())}")


if __name__ == "__main__":
    asyncio.run(seed())
