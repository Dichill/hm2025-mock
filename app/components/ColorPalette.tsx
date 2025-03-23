import React from "react";
import {
    PRIMARY_COLORS,
    SECONDARY_COLORS,
    TERTIARY_COLORS,
} from "@/lib/colors";

type ColorBlockProps = {
    colorName: string;
    hexCode: string;
    rgbValue: string;
    cmykValue: string;
};

const ColorBlock: React.FC<ColorBlockProps> = ({
    colorName,
    hexCode,
    rgbValue,
    cmykValue,
}) => {
    return (
        <div className="flex flex-col">
            <div
                className="w-32 h-32 rounded-md shadow-md"
                style={{ backgroundColor: hexCode }}
            ></div>
            <div className="mt-2">
                <p className="font-medium text-sm">{colorName}</p>
                <p className="text-xs">HEX: {hexCode}</p>
                <p className="text-xs">RGB: {rgbValue}</p>
                <p className="text-xs">CMYK: {cmykValue}</p>
            </div>
        </div>
    );
};

type ColorSectionProps = {
    title: string;
    description?: string;
    colors: Record<string, { hex: string; rgb: string; cmyk: string }>;
};

const ColorSection: React.FC<ColorSectionProps> = ({
    title,
    description,
    colors,
}) => {
    return (
        <div className="mb-8">
            <div className="mb-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(colors).map(([name, color]) => (
                    <ColorBlock
                        key={name}
                        colorName={name.replace(/_/g, " ")}
                        hexCode={color.hex}
                        rgbValue={color.rgb
                            .replace("rgb(", "")
                            .replace(")", "")}
                        cmykValue={color.cmyk}
                    />
                ))}
            </div>
        </div>
    );
};

export default function ColorPalette(): React.ReactElement {
    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">
                MESA Brand Color Palette
            </h1>
            <p className="mb-8 text-lg">
                The MESA colors create an overall warm palette that reflects the
                organization&apos;s identity.
            </p>

            <ColorSection title="PRIMARY COLORS" colors={PRIMARY_COLORS} />

            <ColorSection
                title="SECONDARY COLORS"
                description="Use to complement the primary colors"
                colors={SECONDARY_COLORS}
            />

            <ColorSection
                title="TERTIARY COLORS"
                description="Use minimally as a highlight color"
                colors={TERTIARY_COLORS}
            />

            <div className="mt-12">
                <h3 className="text-lg font-semibold mb-2">
                    Using the colors in your code
                </h3>
                <p className="mb-4">
                    You can use these colors in your Tailwind classes:
                </p>
                <div className="bg-gray-100 p-4 rounded-md">
                    <pre className="text-sm">
                        {`// Examples:
<div className="bg-mesa-warm-red text-white">Warm Red Background</div>
<p className="text-mesa-purple">Purple Text</p>
<button className="bg-mesa-yellow-116 hover:bg-mesa-orange">
  Button with Yellow background that changes to Orange on hover
</button>`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
