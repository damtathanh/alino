interface Props {
    title: string;
    description?: string;
    children: React.ReactNode;
}

const SectionCard = ({ title, description, children }: Props) => {
    return (
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-4">
            <div>
                <h2 className="text-lg font-semibold text-primary">{title}</h2>
                {description && (
                    <p className="text-sm text-secondary mt-1">{description}</p>
                )}
            </div>
            {children}
        </div>
    );
};

export default SectionCard;
