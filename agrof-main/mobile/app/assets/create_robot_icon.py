#!/usr/bin/env python3
"""
Create a PNG robot icon for AGROF app
"""

from PIL import Image, ImageDraw
import os

def create_robot_icon():
    """Create a 1024x1024 robot icon"""
    
    # Create image
    size = 1024
    img = Image.new('RGBA', (size, size), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    
    # Colors
    primary_green = (76, 175, 80, 255)      # #4CAF50
    dark_green = (46, 125, 50, 255)         # #2E7D32
    white = (255, 255, 255, 255)            # #FFFFFF
    blue = (33, 150, 243, 255)              # #2196F3
    orange = (255, 152, 0, 255)             # #FF9800
    
    # Robot Head
    draw.rounded_rectangle([200, 200, 824, 600], radius=50, fill=primary_green, outline=dark_green, width=8)
    
    # Robot Eyes
    draw.ellipse([290, 290, 410, 410], fill=white)  # Left eye
    draw.ellipse([614, 290, 734, 410], fill=white)  # Right eye
    draw.ellipse([320, 320, 380, 380], fill=blue)   # Left pupil
    draw.ellipse([644, 320, 704, 380], fill=blue)   # Right pupil
    
    # Robot Antenna
    draw.rectangle([480, 150, 544, 230], fill=primary_green, outline=dark_green, width=4)
    draw.ellipse([492, 110, 532, 150], fill=orange)
    
    # Robot Mouth
    draw.rounded_rectangle([400, 450, 624, 470], radius=10, fill=white)
    
    # Robot Body
    draw.rounded_rectangle([250, 600, 774, 900], radius=30, fill=primary_green, outline=dark_green, width=8)
    
    # Robot Arms
    draw.rounded_rectangle([150, 650, 270, 850], radius=60, fill=primary_green, outline=dark_green, width=6)
    draw.rounded_rectangle([754, 650, 874, 850], radius=60, fill=primary_green, outline=dark_green, width=6)
    
    # Robot Hands
    draw.ellipse([170, 810, 250, 890], fill=primary_green, outline=dark_green, width=6)
    draw.ellipse([774, 810, 854, 890], fill=primary_green, outline=dark_green, width=6)
    
    # Robot Legs
    draw.rounded_rectangle([300, 900, 420, 1000], radius=60, fill=primary_green, outline=dark_green, width=6)
    draw.rounded_rectangle([604, 900, 724, 1000], radius=60, fill=primary_green, outline=dark_green, width=6)
    
    # Robot Feet
    draw.ellipse([300, 970, 420, 1030], fill=dark_green)
    draw.ellipse([604, 970, 724, 1030], fill=dark_green)
    
    # Circuit Patterns
    for y in [250, 500]:
        for x in range(300, 800, 100):
            draw.line([x, y, x+100, y], fill=white, width=4)
    
    # AI Brain Symbol
    draw.ellipse([462, 700, 562, 800], fill=white, outline=blue, width=6)
    draw.line([512, 720, 512, 780], fill=blue, width=6)
    draw.line([482, 750, 542, 750], fill=blue, width=6)
    
    # Save icon
    icon_path = "robot-icon.png"
    img.save(icon_path, "PNG")
    print(f"✅ Robot icon created: {icon_path}")
    
    # Create splash screen
    splash = Image.new('RGBA', (size, size), (255, 255, 255, 255))
    splash_draw = ImageDraw.Draw(splash)
    
    # Center the robot icon
    splash.paste(img, (0, 0), img)
    
    # Add text
    try:
        from PIL import ImageFont
        # Try to use a system font
        font_size = 80
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
        except:
            font = ImageFont.load_default()
        
        # Add AGROF text
        text = "AGROF"
        bbox = splash_draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_x = (size - text_width) // 2
        text_y = 50
        
        # Text shadow
        splash_draw.text((text_x+3, text_y+3), text, font=font, fill=(0, 0, 0, 100))
        splash_draw.text((text_x, text_y), text, font=font, fill=primary_green)
        
    except Exception as e:
        print(f"⚠️ Could not add text to splash: {e}")
    
    splash_path = "splash.png"
    splash.save(splash_path, "PNG")
    print(f"✅ Splash screen created: {splash_path}")

if __name__ == "__main__":
    create_robot_icon()



