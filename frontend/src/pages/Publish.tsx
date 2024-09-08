import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Editor } from '@tinymce/tinymce-react';
import { Chip, TextField, Button, Typography, ThemeProvider, createTheme, Alert } from '@mui/material';
import { styled } from '@mui/system';
import NavBar from '../components/NavBar';
import PublishBlog from '../hooks/publishBlog';

export type BlogPostType = {
  title: string;
  content: string;
  tags: string[];
};


const TagChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const PublishButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Publish: React.FunctionComponent = () => {
  const [post, setPost] = useState<BlogPostType>({
    title: '',
    content: '',
    tags: [],
  });
  const [currentTag, setCurrentTag] = useState<string>('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, title: event.target.value });
  };

  const handleEditorChange = (content: string) => {
    setPost({ ...post, content });
  };

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(event.target.value);
  };

  const handleTagInputKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && currentTag.trim() !== '') {
      if (!post.tags.includes(currentTag.trim())) {
        setPost({ ...post, tags: [...post.tags, currentTag.trim()] });
      }
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setPost({ ...post, tags: post.tags.filter((tag) => tag !== tagToRemove) });
  };
  const handlePublish = async () => {
    if (post.title.trim() === '' || post.content.trim() === '') {
      alert('Please fill in the title and content before publishing.');
      return;
    }
  
    console.log('Publishing post:', post);
  
    try {
      await PublishBlog(post); 
      <Alert severity='success'>Post published successfully!</Alert>
    } catch (error) {
      console.error('Error posting blog:', error);
      <Alert severity='error'>Failed to publish the post. Please try again later.</Alert>
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" gutterBottom>
        Publish Your Blog Post
      </Typography>

      <TextField
        fullWidth
        label="Post Title"
        variant="outlined"
        value={post.title}
        onChange={handleTitleChange}
        margin="normal"
      />

      <Editor
        apiKey="obpcr2mo7gkjr09evv6kp4j3wqq2i09i3rxhgxbdl962ufvt"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
        }}
        onEditorChange={handleEditorChange}
      />

      <TextField
        fullWidth
        label="Add Tags"
        variant="outlined"
        value={currentTag}
        onChange={handleTagInputChange}
        onKeyPress={handleTagInputKeyPress}
        margin="normal"
        helperText="Press Enter to add a tag"
      />

      <div>
        {post.tags.map((tag) => (
          <TagChip
            key={tag}
            label={tag}
            onDelete={() => handleRemoveTag(tag)}
            color="primary"
          />
        ))}
      </div>

      <PublishButton
        variant="contained"
        color="primary"
        onClick={handlePublish}
        size="large"
      >
        Publish Post
      </PublishButton>

     
    </motion.div>
  );
};

const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
    },
  });

function BlogPublishPage() {
    return (
      <ThemeProvider theme={theme}>
        <NavBar ></NavBar>
        <div className='lg:mx-36 md:mx-20 sm:mx-10 my-10'><Publish /></div>
      </ThemeProvider>
    );
  }


export default BlogPublishPage;
