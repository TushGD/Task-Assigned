const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-32 h-32 relative flex items-center justify-center">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl bg-primary-500/20 blur-xl animate-pulse"></div>

        <div className="w-full h-full relative flex items-center justify-center">
          {/* Spinning gradient ring */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500 via-primary-500/50 to-primary-900 animate-spin blur-sm"></div>

          {/* Inner container with bouncing bars */}
          <div className="absolute inset-1 bg-primary-50 rounded-lg flex items-center justify-center overflow-hidden">
            <div className="flex gap-1 items-center">
              <div className="w-1.5 h-12 bg-primary-500 rounded-full animate-[bounce_1s_ease-in-out_infinite]"></div>
              <div className="w-1.5 h-12 bg-primary-500/80 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.1s]"></div>
              <div className="w-1.5 h-12 bg-primary-600 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.2s]"></div>
              <div className="w-1.5 h-12 bg-primary-900 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.3s]"></div>
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary-500/10 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Corner ping dots */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary-500 rounded-full animate-ping"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-600 rounded-full animate-ping delay-100"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary-700 rounded-full animate-ping delay-200"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary-900 rounded-full animate-ping delay-300"></div>
      </div>
      
      <p className="mt-8 text-primary-900/70 animate-pulse font-medium">
        Loading amazing movies...
      </p>
    </div>
  );
};

export default LoadingSpinner;