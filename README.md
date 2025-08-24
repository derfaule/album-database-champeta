# Album Collection Website

A modern, responsive website that displays album data from an Airtable database in an interactive grid layout with integrated music players.

## Features

- **Interactive Grid Layout**: Responsive design that adapts to different screen sizes
- **Music Player Integration**: Supports Spotify, SoundCloud, and YouTube embeds
- **Advanced Search & Filtering**: Search by title, artist, and filter by genre
- **Modal Details View**: Click any album for detailed information
- **Real-time Data**: Connects directly to your Airtable database
- **Professional Design**: Dark theme with smooth animations and hover effects

## Setup Instructions

### 1. Airtable Configuration

1. **Get your Airtable credentials**:
   - Go to [Airtable](https://airtable.com) and sign in
   - Navigate to your base containing album data
   - Go to the API documentation: `https://airtable.com/{BASE_ID}/api/docs`
   - Copy your Base ID from the URL or API docs
   - Create a Personal Access Token (PAT):
     - Go to [Developer Hub](https://airtable.com/create/tokens)
     - Click "Create new token"
     - Give it a name (e.g., "Album Collection Website")
     - Add the following scopes: `data.records:read`
     - Add access to your specific base
     - Copy the generated token

2. **Configure the application**:
   - Open `src/config/airtable.ts`
   - Replace `YOUR_BASE_ID_HERE` with your actual Airtable Base ID
   - Replace `YOUR_PAT_HERE` with your actual Personal Access Token
   - Update `TABLE_NAME` if your table has a different name than "Albums"

### 2. Airtable Table Structure

Your Airtable table should have these fields:

| Field Name | Field Type | Description |
|------------|------------|-------------|
| Album Title | Single line text | The name of the album |
| Artist | Single line text | The artist or band name |
| Cover Image | Attachment | Album cover image file |
| Release Date | Date | When the album was released |
| Genre | Single select | Music genre (Rock, Pop, Jazz, etc.) |
| Notes | Long text | Description or additional information |
| Image Attribution | Single line text | Image credit or "Own Image" |
| SoundCloud URL | URL | Link to SoundCloud |
| Spotify URL | URL | Link to Spotify |
| YouTube URL | URL | Link to YouTube |

### 3. Music Player URLs

The system automatically detects and embeds players based on URL formats:

**Spotify URLs** (highest priority):
- `https://open.spotify.com/album/4aawyAB9vmqN3uQ7FjRGTy`
- `https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC`

**SoundCloud URLs**:
- `https://soundcloud.com/artist/track-name`

**YouTube URLs**:
- `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- `https://youtu.be/dQw4w9WgXcQ`

### 4. Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### 5. Deployment

The site is a static React application that can be deployed to any hosting service:

- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Import your project for instant deployment
- **GitHub Pages**: Build and deploy to your repository's gh-pages branch

## Troubleshooting

### Common Issues

1. **"Unable to Load Albums" error**:
   - Check your Airtable Base ID and Personal Access Token in `src/config/airtable.ts`
   - Ensure your Airtable base is accessible
   - Verify the table name matches your configuration
   - Make sure your PAT has the correct scopes (`data.records:read`) and base access

2. **Images not loading**:
   - Make sure the "Cover Image" field in Airtable contains valid image files
   - Check that image attachments are accessible (not restricted)

3. **Music players not working**:
   - Verify that URLs are correctly formatted
   - Check that the music services allow embedding (some tracks may be restricted)

4. **CORS errors**:
   - This is normal during development
   - The production build will work correctly when deployed

### Performance Tips

- The app caches Airtable data for 5 minutes to reduce API calls
- Images are lazy-loaded for better performance
- Use the "Refresh" button to force-reload data from Airtable

## Customization

### Styling
- Modify colors and themes in `src/index.css`
- Adjust responsive breakpoints in component files
- Customize animations and transitions

### Features
- Add new filter options in `SearchFilter.tsx`
- Modify the album card layout in `AlbumCard.tsx`
- Extend the modal with additional information in `AlbumModal.tsx`

### Music Services
- Add support for additional music services in `MusicPlayer.tsx`
- Extend URL parsing for different formats

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Keyboard navigation support
- Screen reader accessible

## License

This project is open source and available under the MIT License.