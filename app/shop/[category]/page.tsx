// // app/shop/[category]/page.tsx
// import { getProductsByCategory, getCategoryBySlug } from '@/lib/data-service'

// export default async function CategoryPage({ params }: { params: { category: string } }) {
//   const [products, category] = await Promise.all([
//     getProductsByCategory(params.category),
//     getCategoryBySlug(params.category)
//   ])
// }
