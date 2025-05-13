
import { WritingStyle } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StyleSelectorProps {
  styles: WritingStyle[];
  selectedStyle: WritingStyle;
  onStyleChange: (style: WritingStyle) => void;
  disabled?: boolean;
}

const StyleSelector = ({ 
  styles, 
  selectedStyle, 
  onStyleChange, 
  disabled = false 
}: StyleSelectorProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Select Writing Style</h3>
        <p className="text-sm text-muted-foreground">
          Choose a style for the AI to follow when generating your text.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {styles.map((style) => (
          <Card
            key={style.id}
            className={`cursor-pointer transition-all duration-300 ${
              selectedStyle.id === style.id
                ? "border-primary ring-2 ring-primary ring-opacity-50"
                : "hover:border-primary/50"
            }`}
            onClick={() => !disabled && onStyleChange(style)}
          >
            <CardHeader className="p-4">
              <CardTitle className="text-base">{style.name}</CardTitle>
              <CardDescription className="text-xs mt-1">
                {style.description}
              </CardDescription>
            </CardHeader>
            <div className="px-4 pb-4">
              <Button
                variant={selectedStyle.id === style.id ? "default" : "outline"}
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  !disabled && onStyleChange(style);
                }}
                disabled={disabled}
              >
                {selectedStyle.id === style.id ? "Selected" : "Select"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
