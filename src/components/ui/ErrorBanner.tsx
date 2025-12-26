interface ErrorBannerProps {
    message: string;
    onClose?: () => void;
}

export const ErrorBanner = ({ message, onClose }: ErrorBannerProps) => {
    if (!message) return null;

    return (
        <div
            className="
        relative
        bg-red-50 border border-red-200 text-red-700
        rounded-xl
        px-1 py-1
        pr-12
        text-sm
      "
            role="alert"
        >
            <span className="block leading-relaxed">{message}</span>

            {onClose && (
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="
            absolute right-4 top-1/2
            -translate-y-1/2
            h-8 w-8
            flex items-center justify-center
            rounded-full
            text-red-500
            hover:bg-red-100 hover:text-red-700
            transition
          "
                >
                    ✕
                </button>
            )}
        </div>
    );
};
