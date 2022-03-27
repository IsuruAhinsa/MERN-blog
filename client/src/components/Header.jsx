const Header = () => {
    return (
        <div className="mt-14">
            <div className="flex flex-col items-center text-[#444] font-['lora']">
                <span className="absolute top-[16%] text-xl">React & Node</span>
                <span className="absolute top-[18%] text-[100px]">Blog</span>
                <span></span>
            </div>
            <img className="w-full h-[450px] mt-20 object-cover" src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="header" />
        </div>
    );
}

export default Header;