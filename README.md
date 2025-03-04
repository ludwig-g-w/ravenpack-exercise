# Ravenpack Blog

## Introduction

This is a simple blog post reading application built with React Native and Expo. The app allows users to browse and read blog posts from the JSONPlaceholder API, a free fake online REST API for testing and prototyping. An exercise for Ravenpack

### Features

- Browse a list of all existing posts
- View a single post with detailed information
- Read comments for each post
- See all posts by a specific user
- Smooth, modern UI with carousel for featured posts

## Technologies

The application is built using the following technologies:

- **React Native**: Cross-platform mobile application framework
- **Expo**: Platform for making universal native apps
- **TypeScript**: Typed superset of JavaScript
- **tRPC**: End-to-end typesafe API layer
- **React Query**: Data fetching and state management
- **NativeWind/Tailwind CSS**: Utility-first CSS framework for styling
- **Expo Router**: File-based routing for Expo apps
- **Jest & Testing library**: integration tests adapted for Expo Router

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ravenpack-exercise
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start the development server**

   ```bash
   bun run start
   ```

4. **Run on a device or emulator**
   - Press `i` to run on iOS simulator
   - Press `a` to run on Android emulator
   - Or scan the QR code with the Expo Go app on your physical device

## Testing

Run the tests with:

```bash
bun run test
```

## Design Choices

### Architecture

- **tRPC with React Query**: Provides end-to-end type safety between the client and server, making API calls more reliable and providing excellent caching and state management.

- **Expo Router**: Used for navigation with a file-based routing system that simplifies the navigation structure and provides a more intuitive development experience.

- **Component Structure**: The application follows a component-based architecture with reusable UI components for posts, comments, and user information.

### UI/UX

- **Featured Posts Carousel**: The home screen features a carousel of the first 5 posts to the latest content.

- **NativeWind/ShadCn**: Used for styling to maintain consistency and improve development speed with utility classes.

### API Integration

- **JSONPlaceholder API**: The application fetches data from the JSONPlaceholder API, which provides fake data for posts, comments, and users.

- **Data Fetching Strategy**: The app uses React Query through tRPC to efficiently fetch and cache data, reducing unnecessary network requests and improving performance.

### Performance Considerations

- **FlashList**: Used instead of FlatList for better performance with large lists.

- **Suspense and Error Boundaries**: Implemented for better loading states and error handling.

- **first5Posts** is actually slower than fetching all 100 but I wanted to display an idea of separating and fetching the most relevant info

- **no Pagination** with long list there should be pagination which the api didn't provide
