import React from 'react';
import ReacMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ value, language = 'javascript' }) => (
  <SyntaxHighlighter style={atomDark} language={language}>
    {value}
  </SyntaxHighlighter>
);

const PostContent = props => (
  <ReacMarkdown
    source={props.source}
    renderers={{ code: CodeBlock, language: props.language }}
  />
);

export default PostContent;
