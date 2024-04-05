'use client';

import { MyContainer } from '~/features/app/components/container';
import { MyPageContainer } from '~/features/app/components/page-container';

import heroImage from './assets/images/picture-hero-image.jpg';
import { MyArticles } from './components/articles';
import { MyJumbotron } from './shared/components/jumbotron';

export default function HomePage() {
  return (
    <MyPageContainer>
      <MyJumbotron heading="Articles" image={heroImage} />
      <MyContainer>
        <MyArticles />
      </MyContainer>
    </MyPageContainer>
  );
}
