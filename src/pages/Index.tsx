
import PostsFeed from "@/components/PostsFeed";
import SidebarRight from "@/components/SidebarRight";

const suggestedConnections = [
  {
    name: "Ana Pérez",
    role: "Sales Manager",
    company: "InnovaTech",
    mutualConnections: 12,
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80",
    city: "Madrid"
  },
  {
    name: "Roberto Silva",
    role: "Account Executive",
    company: "GlobalSoft",
    mutualConnections: 8,
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=85",
    city: "Barcelona"
  },
  {
    name: "Elena Torres",
    role: "Business Development",
    company: "SalesForce",
    mutualConnections: 15,
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=85",
    city: "Madrid"
  },
  {
    name: "Carlos López",
    role: "Marketing Director",
    company: "TechMedia",
    mutualConnections: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80",
    city: "Madrid"
  }
];

const initialPosts = [
  {
    id: "1",
    author: {
      name: "María García",
      role: "Directora de Ventas en TechCorp",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80"
    },
    content: "Acabo de cerrar el trimestre con un 135% de cumplimiento! Todo el esfuerzo valió la pena. Gracias a mi equipo por el increíble trabajo.",
    timestamp: "Hace 2 horas",
    likes: 34,
    comments: 8,
    hasImage: false,
    isScheduled: false
  },
  {
    id: "2",
    author: {
      name: "Juan Martínez",
      role: "Account Executive en SaaS Solutions",
      avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80"
    },
    content: "Compartiendo mi experiencia en el evento de ventas consultivas de ayer. Aprendí técnicas revolucionarias para entender las necesidades ocultas de los clientes.",
    timestamp: "Hace 5 horas",
    likes: 22,
    comments: 4,
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=1974&auto=format&fit=crop",
    isScheduled: false
  }
];

const userCity = "Madrid";

const Index = () => (
  <div className="grid grid-cols-12 gap-6">
    <div className="col-span-12 md:col-span-8">
      <PostsFeed initialPosts={initialPosts} />
    </div>
    <SidebarRight userCity={userCity} suggestedConnections={suggestedConnections} />
  </div>
);

export default Index;
