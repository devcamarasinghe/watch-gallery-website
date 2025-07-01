// src/components/pages/AboutPage.js
import React from 'react';
import styled from 'styled-components';
import { FiAward, FiShield, FiTruck, FiUsers, FiClock, FiHeart } from 'react-icons/fi';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, ${props => props.theme.colors.backgroundSecondary} 0%, ${props => props.theme.colors.background} 100%);
  border-radius: 20px;
  margin-bottom: 4rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.secondary};
  margin-bottom: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.textMuted};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContentSection = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 3rem;
  font-family: ${props => props.theme.fonts.secondary};
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const StoryContent = styled.div`
  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1.5rem;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${props => props.theme.colors.text};
    margin-bottom: 1.5rem;
  }
`;

const StoryImage = styled.div`
  background: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 16px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: ${props => props.theme.colors.textMuted};
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ValueCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ValueIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.theme.colors.secondary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: ${props => props.theme.colors.background};
  font-size: 2rem;
`;

const ValueTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const ValueDescription = styled.p`
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.6;
`;

const StatsSection = styled.section`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border-radius: 20px;
  padding: 4rem 2rem;
  margin-bottom: 4rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled.div`
  h3 {
    font-size: 3rem;
    font-weight: 700;
    color: ${props => props.theme.colors.secondary};
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

const TeamSection = styled.section`
  text-align: center;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const TeamMember = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
`;

const MemberPhoto = styled.div`
  width: 120px;
  height: 120px;
  background: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${props => props.theme.colors.textMuted};
`;

const MemberName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-weight: 500;
  margin-bottom: 1rem;
`;

const MemberBio = styled.p`
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.6;
  font-size: 0.95rem;
`;

const AboutPage = () => {
  return (
    <AboutContainer>
      <HeroSection>
        <HeroTitle>About LuxWatch</HeroTitle>
        <HeroSubtitle>
          Crafting timeless elegance since 2020. We believe every moment deserves 
          the perfect timepiece to mark its significance.
        </HeroSubtitle>
      </HeroSection>

      <ContentSection>
        <SectionTitle>Our Story</SectionTitle>
        <StoryGrid>
          <StoryContent>
            <h3>Founded on Passion</h3>
            <p>
              LuxWatch was born from a simple belief: that time is precious, and the 
              instruments we use to measure it should be equally extraordinary. Founded 
              in 2020 by watch enthusiasts, we set out to create a destination where 
              craftsmanship meets accessibility.
            </p>
            <p>
              What started as a small collection of carefully curated timepieces has 
              grown into a trusted platform serving watch lovers worldwide. Every watch 
              in our collection tells a story of precision, artistry, and dedication.
            </p>
          </StoryContent>
          <StoryImage>⌚</StoryImage>
        </StoryGrid>

        <StoryGrid>
          <StoryImage>🎯</StoryImage>
          <StoryContent>
            <h3>Our Mission</h3>
            <p>
              We're on a mission to make luxury timepieces accessible to everyone. 
              Whether you're looking for your first quality watch or adding to a 
              distinguished collection, we provide expert curation, authentic products, 
              and exceptional service.
            </p>
            <p>
              Our team of horological experts carefully selects each piece, ensuring 
              that every watch meets our rigorous standards for quality, authenticity, 
              and value. We believe that everyone deserves to own a timepiece that 
              reflects their personal style and celebrates life's important moments.
            </p>
          </StoryContent>
        </StoryGrid>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Our Values</SectionTitle>
        <ValuesGrid>
          <ValueCard>
            <ValueIcon>
              <FiAward />
            </ValueIcon>
            <ValueTitle>Quality First</ValueTitle>
            <ValueDescription>
              Every timepiece is carefully inspected and authenticated by our expert team. 
              We guarantee the quality and authenticity of every watch we sell.
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueIcon>
              <FiShield />
            </ValueIcon>
            <ValueTitle>Trust & Security</ValueTitle>
            <ValueDescription>
              Your security is our priority. We use industry-leading encryption and 
              secure payment processing to protect your personal information.
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueIcon>
              <FiTruck />
            </ValueIcon>
            <ValueTitle>Fast & Reliable</ValueTitle>
            <ValueDescription>
              Free shipping on orders over $100, with secure packaging and tracking. 
              Most orders ship within 24 hours of purchase.
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueIcon>
              <FiUsers />
            </ValueIcon>
            <ValueTitle>Customer First</ValueTitle>
            <ValueDescription>
              Our dedicated customer service team is here to help. From pre-purchase 
              questions to after-sale support, we're with you every step.
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueIcon>
              <FiClock />
            </ValueIcon>
            <ValueTitle>Timeless Design</ValueTitle>
            <ValueDescription>
              We curate watches that transcend trends. Each piece is selected for its 
              enduring appeal and craftsmanship that stands the test of time.
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueIcon>
              <FiHeart />
            </ValueIcon>
            <ValueTitle>Passion Driven</ValueTitle>
            <ValueDescription>
              We're not just selling watches; we're sharing our passion for horology. 
              Every recommendation comes from genuine enthusiasm and expertise.
            </ValueDescription>
          </ValueCard>
        </ValuesGrid>
      </ContentSection>

      <StatsSection>
        <SectionTitle style={{ color: 'white', marginBottom: '3rem' }}>
          Our Impact
        </SectionTitle>
        <StatsGrid>
          <StatItem>
            <h3>50K+</h3>
            <p>Happy Customers</p>
          </StatItem>
          <StatItem>
            <h3>500+</h3>
            <p>Watch Models</p>
          </StatItem>
          <StatItem>
            <h3>50+</h3>
            <p>Premium Brands</p>
          </StatItem>
          <StatItem>
            <h3>99.8%</h3>
            <p>Customer Satisfaction</p>
          </StatItem>
        </StatsGrid>
      </StatsSection>

      <TeamSection>
        <SectionTitle>Meet Our Team</SectionTitle>
        <TeamGrid>
          <TeamMember>
            <MemberPhoto>👨‍💼</MemberPhoto>
            <MemberName>Michael Chen</MemberName>
            <MemberRole>Founder & CEO</MemberRole>
            <MemberBio>
              A lifelong watch enthusiast with 15 years in luxury retail. 
              Michael's vision drives our commitment to quality and customer service.
            </MemberBio>
          </TeamMember>

          <TeamMember>
            <MemberPhoto>👩‍💼</MemberPhoto>
            <MemberName>Sarah Johnson</MemberName>
            <MemberRole>Head of Curation</MemberRole>
            <MemberBio>
              Former horologist with expertise in vintage and contemporary timepieces. 
              Sarah ensures every watch meets our exacting standards.
            </MemberBio>
          </TeamMember>

          <TeamMember>
            <MemberPhoto>👨‍💻</MemberPhoto>
            <MemberName>David Rodriguez</MemberName>
            <MemberRole>Customer Experience Lead</MemberRole>
            <MemberBio>
              Dedicated to making every customer interaction exceptional. 
              David leads our support team with passion and expertise.
            </MemberBio>
          </TeamMember>
        </TeamGrid>
      </TeamSection>
    </AboutContainer>
  );
};

export default AboutPage;
