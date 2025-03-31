import React, { useState, useEffect, useRef } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import '../../styles/exerciseStyle.css';

import { useTranslation } from 'react-i18next'; 

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const QuestionComponent = ({
  question,
  options = [],
  questionImageUrl,
  onSubmit,
  currentParagraphIndex,
}) => {
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const optionsShuffled = useRef(false);

  useEffect(() => {
    if (!optionsShuffled.current) {
      const optionsWithIndices = options.map((optionText, index) => ({
        optionText,
        originalIndex: index,
      }));
      setShuffledOptions(shuffleArray([...optionsWithIndices]));
      optionsShuffled.current = true;
    }
  }, [options]);

  const handleListItemClick = (optionText, originalIndex) => {
    setSelectedAnswer(optionText);
    setSelectedOptionIndex(originalIndex);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit(selectedOptionIndex);
  };

  const { t } = useTranslation();

  return (
    <div>
      <Row className="align-items-stretch">
        <Col xs={12} md={questionImageUrl ? 8 : 12} className="d-flex flex-column">
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="yellowCircle">{currentParagraphIndex + 1}</div>
              <h3 style={{ margin: 0 }}>{question}</h3>
            </div>
            <Divider
              variant="middle"
              style={{
                margin: '13px 0',
                backgroundColor: '#666',
                borderBottomWidth: 3,
              }}
            />
          </div>
          <div className="flex-grow-1 d-flex flex-column justify-content-center">
            <Box
              sx={{
                width: '100%',
                bgcolor: '#0e0e13',
                color: 'white',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '5px',
              }}
            >
              <Grid container spacing={2}>
                {shuffledOptions.map(({ optionText, originalIndex }, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <ListItemButton
                      data-testid={`option-${originalIndex}`}
                      onClick={() => handleListItemClick(optionText, originalIndex)}
                      disabled={submitted}
                      sx={{
                        bgcolor:
                          selectedAnswer === optionText
                            ? '#4d0039 !important'
                            : '#1f1f2d',
                        '&:hover': {
                          bgcolor: '#3f3f5a',
                        },
                        color: 'white',
                        borderRadius: '4px',
                        width: '100%',
                      }}
                    >
                      <ListItemIcon>
                        {selectedAnswer === optionText ? (
                          <RadioButtonCheckedIcon sx={{ color: '#ffccff' }} />
                        ) : (
                          <RadioButtonUncheckedIcon sx={{ color: 'white' }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={optionText}
                        primaryTypographyProps={{
                          style: {
                            fontFamily: 'Fredoka, sans-serif',
                            color: 'white',
                            fontSize: '18px',
                          },
                        }}
                      />
                    </ListItemButton>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </div>
          <div>
            <Button
              className="buttons purple"
              size="lg"
              style={{
                marginTop: '10px',
              }}
              onClick={handleSubmit}
              disabled={submitted || !selectedAnswer}
            >
              {t('exercise.question.submitAnswer')}
            </Button>
          </div>
        </Col>
        {questionImageUrl && (
          <Col xs={12} md={4} className="d-flex">
            <img
              src={questionImageUrl}
              alt="Question Illustration"
              className="img-fluid w-100 h-100"
              style={{ objectFit: 'cover', borderRadius: '15px' }}
            />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default QuestionComponent;
