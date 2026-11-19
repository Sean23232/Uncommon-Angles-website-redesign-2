import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { getAllPhotos, getContentItems, getInquiries, getProjects, getTestimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Site Management",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [projects, photos, testimonials, contentItems, inquiries] = await Promise.all([
    getProjects(),
    getAllPhotos(),
    getTestimonials(),
    getContentItems(),
    getInquiries(),
  ]);

  return (
    <AdminDashboard
      projects={projects}
      photos={photos}
      testimonials={testimonials}
      contentItems={contentItems}
      inquiries={inquiries}
    />
  );
}
