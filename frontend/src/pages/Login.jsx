import LoginForm from "../components/LoginForm";

const AuthScreen = () => {

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-[#0A1931]">
      {/* LEFT SIDE: Image Area (Hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center">
        {/* BIG BROTHER NOTE: 
            Replace this URL with your exact local image path! 
            e.g., src="./assets/your-illustration.png" 
        */}
        <img
          src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2000&auto=format&fit=crop"
          alt="Night Forest Illustration"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        {/* Text Overlay exactly like the wireframe */}
        <div className="relative z-10 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-light tracking-[0.4em] drop-shadow-lg">
            WELCOME
          </h1>
        </div>
      </div>
      {/* RIGHT SIDE: Form Area */}
      <LoginForm />
    </div>
  );
};

export default AuthScreen;
