"use client"
import React, { useState, useEffect } from 'react';
import CallFor2 from '@/utilities/CallFor2';
import { toast as reToast } from "react-hot-toast";

// Shared Tailwind CSS classes
const buttonClasses = 'px-4 py-2 rounded-md mr-2';
const uploadButtonClasses = 'bg-primary text-primary-foreground ' + buttonClasses;
const removeButtonClasses = 'bg-destructive text-destructive-foreground ' + buttonClasses;
const textareaClasses = 'w-full p-2 border border-border rounded-md';

const ProfileEditor = () => {
  const [profile, setProfile] = useState({
    VendorId: 0,
    Description: '',
    CustomCss: '',
    ProfilePictureId: null,
    ProfilePictureUrl: '',
    BannerPictureId: null,
    BannerPictureUrl: '',
    MobileBannerPictureId: null,
    MobileBannerPictureUrl: '',
    Locales: [{ LanguageId: 1, Description: '' }],
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await CallFor2('api/VendorShopAdminApi/Profile', "get", null, "Auth");
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await CallFor2(
        `api/VendorShopAdminApi/Profile`,
        "post",
        profile,
        "Auth"
      );

      if (response) {
        reToast.success('Profile saved successfully!');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      reToast.error('Error saving profile. Please try again.');
    }
  };

  const handleImageUpload = async (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await CallFor2('api-fe/Account/UploadPicture', "post", formData, "authWithContentTypeMultipart");

          if (response.data.Data && response.data.Data.PictureId) {
            setProfile(prev => ({
              ...prev,
              [`${type}PictureId`]: response.data.Data.PictureId,
              [`${type}PictureUrl`]: response.data.Data.PictureUrl
            }));
          } else {
            throw new Error('Invalid response from server');
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          reToast.error('Error uploading image. Please try again.');
        }
      }
    };
    input.click();
  };

  const handleImageRemove = (type) => {
    setProfile(prev => ({
      ...prev,
      [`${type}PictureId`]: null,
      [`${type}PictureUrl`]: ''
    }));
  };

  return (
    <div className="p-6 bg-card text-foreground">
      <h1 className="text-2xl font-bold mb-4 text-orange-400">Profile</h1>

      <div className="mb-6 flex items-start">
        <label className="block font-bold mb-2 mr-4 w-1/3">Description</label>
        <textarea
          className={textareaClasses}
          rows="5"
          name="Description"
          value={profile.Description || ''}
          onChange={handleInputChange}
          placeholder="Enter your description here..."
        />
      </div>

      <div className="mb-6 flex items-start">
        <h2 className="font-bold mb-2 mr-4 w-1/4">Profile picture</h2>
        <div className="flex items-center">
          {profile.ProfilePictureUrl && (
            <img className="w-16 h-16 rounded-full mr-4" src={profile.ProfilePictureUrl} alt="Profile picture" />
          )}
          <div>
            <button className={uploadButtonClasses} onClick={() => handleImageUpload('Profile')}>Upload a file</button>
            <button className={removeButtonClasses} onClick={() => handleImageRemove('Profile')}>Remove picture</button>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-start">
        <h2 className="font-bold mb-2 mr-4 w-1/4">Banner picture</h2>
        <div className="flex items-center">
          {profile.BannerPictureUrl ? (
            <img className="w-32 h-16 rounded-md mr-4" src={profile.BannerPictureUrl} alt="Banner picture" />
          ) : (
            <div className="w-32 h-16 bg-zinc-200 rounded-md mr-4"></div>
          )}
          <div>
            <button className={uploadButtonClasses} onClick={() => handleImageUpload('Banner')}>Upload a file</button>
            <button className={removeButtonClasses} onClick={() => handleImageRemove('Banner')}>Remove picture</button>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-start">
        <h2 className="font-bold mb-2 mr-4 w-1/4">Banner picture (mobile)</h2>
        <div className="flex items-center">
          {profile.MobileBannerPictureUrl ? (
            <img className="w-32 h-16 rounded-md mr-4" src={profile.MobileBannerPictureUrl} alt="Mobile banner picture" />
          ) : (
            <div className="w-32 h-16 bg-zinc-200 rounded-md mr-4"></div>
          )}
          <div>
            <button className={uploadButtonClasses} onClick={() => handleImageUpload('MobileBanner')}>Upload a file</button>
            <button className={removeButtonClasses} onClick={() => handleImageRemove('MobileBanner')}>Remove picture</button>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-start">
        <label className="block font-bold mb-2 mr-4 w-1/3">Custom CSS</label>
        <textarea
          className={textareaClasses}
          rows="3"
          name="CustomCss"
          value={profile.CustomCss || ''}
          onChange={handleInputChange}
          placeholder="Enter your custom CSS here..."
        />
      </div>

      <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default ProfileEditor;