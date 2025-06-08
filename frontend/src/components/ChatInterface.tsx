import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    Tooltip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VoiceInput from './VoiceInput';

interface Message {
    text: string;
    translation?: string;
    isUser: boolean;
    audio?: string;
}

interface Language {
    code: string;
    name: string;
}

const SUPPORTED_LANGUAGES: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'mr', name: 'Marathi' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'pa', name: 'Punjabi' },
];

const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [sourceLanguage, setSourceLanguage] = useState('en');
    const [targetLanguage, setTargetLanguage] = useState('hi');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const playAudio = async (base64Audio: string) => {
        try {
            const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
            await audio.play();
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        try {
            setIsProcessing(true);
            const userMessage: Message = { text: inputText, isUser: true };
            setMessages(prev => [...prev, userMessage]);
            setInputText('');

            const response = await fetch('/api/process-text', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: inputText,
                    source_language: sourceLanguage,
                    target_language: targetLanguage,
                    include_speech: true
                })
            });

            if (!response.ok) throw new Error('Failed to process text');

            const data = await response.json();
            const botMessage: Message = {
                text: data.source_text,
                translation: data.translated_text,
                isUser: false,
                audio: data.audio
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error processing message:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleAudioCapture = async (audioData: string) => {
        try {
            setIsProcessing(true);
            const response = await fetch('/api/process-voice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    audio_data: audioData,
                    source_language: sourceLanguage,
                    target_language: targetLanguage,
                    include_speech: true
                })
            });

            if (!response.ok) throw new Error('Failed to process voice');

            const data = await response.json();
            const userMessage: Message = {
                text: data.source_text,
                isUser: true
            };
            const botMessage: Message = {
                text: data.source_text,
                translation: data.translated_text,
                isUser: false,
                audio: data.audio
            };

            setMessages(prev => [...prev, userMessage, botMessage]);
        } catch (error) {
            console.error('Error processing voice:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Source Language</InputLabel>
                    <Select
                        value={sourceLanguage}
                        label="Source Language"
                        onChange={(e) => setSourceLanguage(e.target.value)}
                    >
                        {SUPPORTED_LANGUAGES.map((lang) => (
                            <MenuItem key={lang.code} value={lang.code}>
                                {lang.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Target Language</InputLabel>
                    <Select
                        value={targetLanguage}
                        label="Target Language"
                        onChange={(e) => setTargetLanguage(e.target.value)}
                    >
                        {SUPPORTED_LANGUAGES.map((lang) => (
                            <MenuItem key={lang.code} value={lang.code}>
                                {lang.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Paper
                elevation={3}
                sx={{
                    flex: 1,
                    mb: 2,
                    p: 2,
                    overflow: 'auto',
                    bgcolor: 'background.default'
                }}
            >
                {messages.map((message, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: message.isUser ? 'flex-end' : 'flex-start',
                            mb: 2
                        }}
                    >
                        <Paper
                            sx={{
                                p: 2,
                                maxWidth: '70%',
                                bgcolor: message.isUser ? 'primary.main' : 'secondary.main',
                                color: 'white'
                            }}
                        >
                            <Typography>{message.text}</Typography>
                            {message.translation && (
                                <Typography
                                    sx={{
                                        mt: 1,
                                        pt: 1,
                                        borderTop: '1px solid rgba(255,255,255,0.3)'
                                    }}
                                >
                                    {message.translation}
                                </Typography>
                            )}
                        </Paper>
                        {message.audio && (
                            <IconButton
                                size="small"
                                onClick={() => playAudio(message.audio!)}
                                sx={{ mt: 1 }}
                            >
                                <VolumeUpIcon />
                            </IconButton>
                        )}
                    </Box>
                ))}
                <div ref={messagesEndRef} />
            </Paper>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <VoiceInput
                    onAudioCapture={handleAudioCapture}
                    isProcessing={isProcessing}
                />

                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isProcessing}
                />

                <Button
                    variant="contained"
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isProcessing}
                    startIcon={<SendIcon />}
                >
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default ChatInterface; 