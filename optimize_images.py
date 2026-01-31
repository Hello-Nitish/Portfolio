from PIL import Image
import os

def optimize_image(filename, target_width, output_name):
    try:
        path = os.path.join('assets', filename)
        if not os.path.exists(path):
            print(f"File not found: {path}")
            return

        with Image.open(path) as img:
            # Calculate new height to maintain aspect ratio
            aspect_ratio = img.height / img.width
            new_height = int(target_width * aspect_ratio)
            
            # Resize
            img = img.resize((target_width, new_height), Image.Resampling.LANCZOS)
            
            # Save as WebP
            output_path = os.path.join('assets', output_name)
            img.save(output_path, 'WEBP', quality=80)
            print(f"Optimized {filename} -> {output_name}")
            
    except Exception as e:
        print(f"Error processing {filename}: {e}")

# Optimize Hero Image
optimize_image('profile-new.png', 500, 'profile-new.webp')

# Optimize Project Image
optimize_image('naan_mudhalvan_project.png', 400, 'naan_mudhalvan_project.webp')
