import { SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};

export const HomePageFilters = [
  { name: "Newest", value: "Newest" },
  { name: "Recommended", value: "Recommended" },
  { name: "Frequent", value: "Frequent" },
  { name: "Unanswered", value: "Unanswered" },
];

export const CommunityPageFilters = [
  { name: "New Users", value: "New Users" },
  { name: "Old Users", value: "Old Users" },
  { name: "Top Contributors", value: "Top Contributors" },
];

export const TagPageFilters = [
  { name: "Popular", value: "Popular" },
  { name: "Recent", value: "Recent" },
  { name: "Old", value: "Old" },
  { name: "Name", value: "Name" },
];

export const answerFilters = [
  { name: "Highest Upvotes", value: "Highest Upvotes" },
  { name: "Lowest Upvotes", value: "Lowest Upvotes" },
  { name: "Most Recent", value: "Most Recent" },
  { name: "Oldest", value: "Oldest" },
];
