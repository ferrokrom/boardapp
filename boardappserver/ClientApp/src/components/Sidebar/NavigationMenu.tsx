import { AiFillMail, AiFillBell, AiFillGold } from "react-icons/ai";

function NavigationMenu({ isOpen }: { isOpen: boolean }) {
  const navigationItems = [
    { text: "Inbox", icon: <AiFillMail size={20} /> },
    { text: "My Tasks", icon: <AiFillGold size={20} /> },
    { text: "Notifications", icon: <AiFillBell size={20} /> },
    { text: "Projects", icon: <AiFillMail size={20} /> },
  ];

  return (
    <div className="flex flex-col w-full">
      <div>
        {navigationItems.map((menu, index) => {
          return (
            <div
              key={index}
              className="flex items-center transition-all duration-300 ease-out font-bold border-solid border-gray-500 rounded-md relative"
            >
              <div
                className="relative transition-background duration-300 ease-out bg-gray-900 text-white rounded-full p-4"
                style={{
                  background: isOpen ? "transparent" : "#1e1e2d",
                  color: isOpen ? "black" : "white",
                }}
              >
                {menu.icon}
                <div
                  className={`absolute top-8 right-8 bg-a3a3b9 border-2 border-a3a3b9 rounded-full text-white w-15 font-sans text-center ${
                    isOpen ? "opacity-0" : "opacity-1"
                  }`}
                >
                  6
                </div>
              </div>
              {menu.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NavigationMenu;
