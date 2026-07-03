import { Clock, Brush, MapPin } from "lucide-react";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa6";
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

interface InfoProps {
  Icon: LucideIcon | IconType;
  label: string;
  value: string;
  sub: string;
  href: string | null;
}

export const info: InfoProps[] = [
  {
    Icon: Clock,
    label: "Response time",
    value: "Within 24 hours",
    sub: "We reply to every message",
    href: null,
  },
  {
    Icon: Brush,
    label: "Custom orders",
    value: "Open for commissions",
    sub: "Photography, frames, mugs, pillows, interior decor",
    href: null,
  },
  {
    Icon: MapPin,
    label: "Location",
    value: "Owerri, Imo, Nigeria",
    sub: "Available for local and remote projects",
    href: "https://maps.app.goo.gl/sCUuHL4Ams16eqAG8",
  },
  {
    Icon: FaInstagram,
    label: "Instagram",
    value: "@itz_visibility",
    sub: "Follow for latest works",
    href: "https://instagram.com/visitoonz",
  },
  {
    Icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+234-813-131-8140",
    sub: "Chat with us directly",
    href: "https://wa.me/2348131318140",
  },
  {
    Icon: FaFacebook,
    label: "Facebook",
    value: "@Visitoonz",
    sub: "Chat with us directly",
    href: "https://facebook.com/Visitoonz",
  },
];
