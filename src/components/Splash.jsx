export default function Splash() {
    return (
        <div id="splashParent" className="fixed inset-0 bg-[#00000094] z-[1000] w-full h-full">
            <div
                id="splashChild"
                className="w-[150px] h-[150px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* <img
                    src="https://plus.unsplash.com/premium_photo-1701090939615-1794bbac5c06?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JheSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
                    alt="IconBg"
                    id="IconBg"
                    className="w-full h-full" /> */}
                <img
                    src="/assets/images/logo.png"
                    alt="IconNoBg"
                    id="IconNoBg"
                    className="absolute top-[30%] left-[25%] w-1/2 h-1/2" />
            </div>
        </div>
    );
}