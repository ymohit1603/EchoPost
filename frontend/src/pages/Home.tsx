import React, { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

type AnimatedTextProps = {
  children: string;
  position: [number, number, number];
};


type FeatureProps = {
  title: string;
  description: string;
};


const AnimatedText: React.FC<AnimatedTextProps> = ({ children, position }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.2;
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.2;
    }
  });

  return (
    <Text ref={ref} fontSize={1.5} letterSpacing={0.1} position={position}>
      {children}
    </Text>
  );
};

const AnimatedBackground: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh}>
      <torusGeometry args={[10, 3, 16, 100]} />
      <meshStandardMaterial color="#8B5CF6" wireframe />
    </mesh>
  );
};


const LandingPage: React.FC = () => {
  // const [isLoaded, setIsLoaded] = useState<boolean>(false);
  // const { scrollYProgress } = useViewportScroll();
  // const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  
  const navigate = useNavigate();

  // useEffect(() => {
  //   setIsLoaded(true);
  // }, []);
  // const notAuthenticated=

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const springProps = useSpring({
    from: { transform: "translateY(50px)", opacity: 0 },
    to: { transform: "translateY(0px)", opacity: 1 },
    delay: 600
  });

  
  const features: FeatureProps[] = [
    { title: "Express Yourself", description: "Share your thoughts and experiences." },
    { title: "Discover Stories", description: "Explore a vast collection of articles." },
    { title: "Connect with Others", description: "Engage with like-minded individuals." }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedBackground />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      <div className="relative z-10">
        <NavBar></NavBar>

        <main className="container mx-auto px-4 py-16">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h2 className="text-6xl font-bold mb-4">Welcome to EchoPost</h2>
            <p className="text-2xl text-gray-300 mb-8">Discover, Create, and Share Amazing Stories</p>
            <div className="flex justify-center gap-5">
            <motion.button
                // onClick={() => notAuthenticated?navigate('/signin'):navigate('/signup')}
                onClick={()=>navigate('/publish')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Writing
            </motion.button>
            <motion.button
              onClick={() => navigate('/blogs')}
              className=" bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Blogs
            </motion.button>
            </div>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-filter backdrop-blur-lg"
                variants={fadeIn}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </main>

        <div className="h-96 my-16">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedText position={[-3.5, 0, 0]}>Echo</AnimatedText>
            <AnimatedText position={[3.5, 0, 0]}>Post</AnimatedText>
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>

        <animated.footer style={springProps} className="bg-purple-900 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 EchoPost. All rights reserved.</p>
          </div>
        </animated.footer>
      </div>
    </div>
  );
};

export default LandingPage;