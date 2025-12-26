interface SuccessBannerProps {
    message: string;
    onClose?: () => void;
}

const SuccessBanner = ({ message, onClose }: SuccessBannerProps) => {
    if (!message) return null;

    return (
        <div
            className="
        relative
        bg-green-50 border border-green-200 text-green-700
        rounded-xl
        px-4 py-3
        pr-12
        text-sm
      "
        >
            <span>{message}</span>

            {onClose && (
                <button
                    onClick={onClose}
                    className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-green-600 hover:text-green-800
          "
                >
                    ✕
                </button>
            )}
        </div>
    );
};

export default SuccessBanner;
