import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Summary",
    icon: "book-outline",
    link: "dashboard",
    home: true,
  },
  {
    title: "Users Managment",
    icon: "people-outline",
    children: [
      {
        title: "Customers",
        link: "users",
        pathMatch: "full",
      },
      {
        title: "Vendors",
        link: "vendors",
      },
      {
        title: "Designers",
        link: "designers",
      },
      {
        title: "Permissions",
        link: "roles",
      },
    ],
  },
  {
    title: "Catalogue",
    icon: "book-open-outline",
    children: [
      {
        title: "Categories",
        link: "categories",
      },
      {
        title: "Options",
        link: "options",
      },
      {
        title: "Mockups",
        link: "mockups",
      },
      {
        title: "Arts",
        link: "arts",
      },
      {
        title: "Products",
        link: "products",
      },
    ],
  },
  {
    title: "Content",
    icon: "file-text-outline",
    children: [
      {
        title: "Articles",
        link: "articles",
      },
      {
        title: "About Us",
        link: "about-us",
      },
      {
        title: "Terms",
        link: "terms",
      },
      {
        title: "FAQ",
        link: "faq",
      },
    ],
  },
  {
    title: "Reviews",
    link: "reviews",
    icon: "edit-2-outline",
  },
  {
    title: "Messages",
    link: "messages",
    icon: "message-circle-outline",
  },
];
