import { classNames } from "../lib/cssTools";

const PageSection = ({
    title,
    description,
    subheading,
    imageSrc,
    reversed,
    bg
}) => {
    return (
        <section
            className={classNames(
                "p-12 gap-12 flex justify-around md:items-center flex-col",
                (reversed ? "md:flex-row-reverse" : "md:flex-row"),
                (bg ? bg : "bg-white")
        )}
        >
            <div className="space-y-2 max-w-[400px]">
                <h1 className="text-4xl font-bold">{title}</h1>
                {subheading && (
                    <h3 className="text-xl font-bold text-zinc-500">
                        {subheading}
                    </h3>
                )}
                <p className="text-zinc-900 text-md">{description}</p>
            </div>
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={title}
                    className="max-w-[500px] shadow-2xl rounded-lg"
                />
            )}
        </section>
    );
};

export default PageSection;