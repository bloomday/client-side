import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiCall } from '../utils/api';
import FlashMessage from '../components/FlashMessage';
import BackButton from '../components/layout/BackButton';

interface ImageGalleryItem {
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

const EventGalleryPage: React.FC = () => {
  console.log('EventGalleryPage: Component started rendering.');
  const { eventId } = useParams<{ eventId: string }>();
  const [images, setImages] = useState<ImageGalleryItem[]>([]);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [flashMessageType, setFlashMessageType] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      console.log('EventGalleryPage: useEffect triggered.');
      if (!eventId) {
        console.log('EventGalleryPage: No eventId found, returning.');
        return;
      }

      try {
        console.log('EventGalleryPage: Attempting to fetch images for eventId:', eventId);
        const token = localStorage.getItem('token');
        console.log('EventGalleryPage: Token from localStorage:', token ? 'Present' : 'Not Present');

        const response = await apiCall<ImageGalleryItem[]>(`/events/${eventId}/gallery`, 'GET', undefined, true);

        console.log('EventGalleryPage: API response:', response);

        if (response.success && response.data) {
          setImages(response.data);
        } else {
          setFlashMessage(response.message || 'Failed to fetch images.');
          setFlashMessageType('error');
        }
      } catch (error: any) {
        console.error('EventGalleryPage: Error fetching event gallery:', error);
        setFlashMessage(error.message || 'An error occurred while fetching images.');
        setFlashMessageType('error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryImages();
  }, [eventId]);

  const handleCloseFlash = () => {
    setFlashMessage(null);
    setFlashMessageType(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#14191f] flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading gallery...</p>
      </div>
    );
  }

  if (!eventId) {
    return (
      <div className="min-h-screen bg-[#14191f] flex items-center justify-center">
        <p className="text-gray-600 text-lg">Event ID is missing.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#14191f] p-4">
      <div className="max-w-6xl mx-auto">
        <BackButton />
        <h1 className="text-xl font-bold text-white mb-2 text-center">Event Gallery</h1>
        <p className="text-center text-gray-300 mb-6">All Photos</p>

        {images.length === 0 ? (
          <p className="text-gray-400 text-center">No images uploaded for this event yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
                <img src={img.url} alt={`Event Gallery ${index + 1}`} className="w-full h-40 object-cover object-center" />
                <div className="p-4">
                  <p className="text-gray-800 text-sm font-semibold">Uploaded by: {img.uploadedBy}</p>
                  <p className="text-gray-600 text-xs">on {new Date(img.uploadedAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <FlashMessage message={flashMessage} type={flashMessageType} onClose={handleCloseFlash} />
    </div>
  );
};

export default EventGalleryPage; 