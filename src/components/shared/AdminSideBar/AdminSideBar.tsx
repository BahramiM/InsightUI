import Link from "next/link";

export default function AdminSideBar() {
  const menu = [
    {
      title: "Posts",
      subMenu: [
        {
          lable: "New Post",
          link: "/admin/post",
        },
        {
          lable: "Posts list",
          link: "/admin/posts",
        },
      ],
    },
    {
      title: "Requests",
      subMenu: [
        {
          lable: "Author Requests",
          link: "/admin/author-requests",
        },
      ],
    },
  ];

  return (
    <div className="">
      <ul>
        {menu.map((menuItem) =>
          menuItem.subMenu.length > 0 ? (
            <li>
              <div className="border border-gray-700 px-4 py-2">
                {menuItem.title}
              </div>
              <ul className="mx-4 my-2">
                {menuItem.subMenu.map((sub) => (
                  <li className="not-last:border-b not-last:border-gray-800 py-1">
                    <Link href={sub.link}>{sub.lable}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}
