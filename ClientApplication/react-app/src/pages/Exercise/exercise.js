import React, {useState, useEffect, useMemo, useRef} from 'react';
import '../../styles/exerciseStyle.css';
import { QuestionComponent } from '../../.components/.MainComponentsExport';
import { useNavigate } from 'react-router-dom';
import { ArticleInfo, FeedbackMessage, ConfettiEffect, ResultsTableComponent, ReadingExerciseComponent } from '../../.components/Exercise/.MainExerciseExport';
import { exerciseInfo } from './articleData';
import { ParagraphSession } from '../../.entities/.MainEntitiesExport';
import { ArticleSession } from '../../.entities/.MainEntitiesExport';
import { ArticleSessionController } from '../../.controllers/.MainControllersExport';
import { QuestionSession } from '../../.entities/.MainEntitiesExport';

import { ArticleController, ParagraphController, QuestionController } from '../../.controllers/.MainControllersExport';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 
import { ThreeDots } from 'react-loader-spinner';
import {UserManager} from "../../.controllers/.dataProcessingHelpers/DataProccessingHelpersExport";
import * as signalR from "@microsoft/signalr";

const Exercise = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const redirectToCategories = () => {
    navigate('/categories');
  };

  const valuetext = (value) => `${value}`;

  const [searchParams] = useSearchParams();
  const [articleId, setArticleId] = useState(searchParams.get('articleId'));
  const [articleData, setArticleData] = useState(null);
  const [paragraphs, setParagraphs] = useState([]);
  const [questionsPerParagraph, setQuestionsPerParagraph] = useState([]);
  const [paragraphImageUrl, setParagraphImageUrl] = useState(null);
  const [questionImageUrl, setQuestionImageUrl] = useState(null);

  const [inputValue, setInputValue] = useState(238); 
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionButtonClicked, setQuestionButtonClicked] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [articleCompleted, setArticleCompleted] = useState(false);
  const [timePerParagraph, setTimePerParagraph] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [answersCorrectness, setAnswersCorrectness] = useState([]);
  const [confettiActive, setConfettiActive] = useState(false);

  const [paragraphSessions, setParagraphSessions] = useState([]);
  const [articleSession, setArticleSession] = useState(null); 

  const { avgReadingSpeed, worldRecordWPM, usersWPM } = exerciseInfo;

  const [isChatVisible, setIsChatVisible] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const hubConnection = useRef(null);

  const [chatHistory] = React.useState([
    { sender: "username", content: "test" },
    { sender: "asd",      content: "test2" },
    { sender: "asd",      content: "53454" },
    { sender: "asd",      content: "asdasd 234234 sdsdf" }
  ]);

  useEffect(() => {
    if (articleId) {
      const newArticleSession = ArticleSession.createSession(Number(articleId));
      setArticleSession(newArticleSession);
    }
  }, [articleId]);

  const words = useMemo(() => {
    return paragraphs[currentParagraphIndex]?.text?.split(' ') || [];
  }, [paragraphs, currentParagraphIndex]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        let MyArticleId = articleId;
        if (MyArticleId === null) {
          let randomArticle = await ArticleController.GetRandom();
          MyArticleId = randomArticle.id; 
        }
        const article = await ArticleController.Get(MyArticleId);
        setArticleData(article);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    fetchArticle();
  }, [articleId]);

  useEffect(() => {
    const fetchParagraphs = async () => {
      try {
        const paragraphsData = await Promise.all(
          articleData.paragraphIDs.map((id) => ParagraphController.Get(id))
        );
        setParagraphs(paragraphsData);
      } catch (error) {
        console.error('Error fetching paragraphs:', error);
      }
    };
    if (articleData && articleData.paragraphIDs && articleData.paragraphIDs.length > 0) {
      fetchParagraphs();
    }
  }, [articleData]);

  const totalParagraphs = paragraphs.length;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsData = await Promise.all(
          paragraphs.map(async (paragraph) => {
            if (paragraph.questionIDs && paragraph.questionIDs.length > 0) {
              const questionsForParagraph = await Promise.all(
                paragraph.questionIDs.map((questionID) => QuestionController.Get(questionID))
              );
              return questionsForParagraph;
            } else {
              return [];
            }
          })
        );
        setQuestionsPerParagraph(questionsData);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    if (paragraphs.length > 0) {
      fetchQuestions();
    }
  }, [paragraphs]);

  useEffect(() => {
    let isMounted = true;
    const fetchQuestionImage = async () => {
      try {
        const currentQuestions = questionsPerParagraph[currentParagraphIndex] || [];
        if (currentQuestions.length === 0) {
          setQuestionImageUrl(null);
          return;
        }

        const question = currentQuestions[0]; 
        const imageURL = await QuestionController.GetImage(question.id);

        if (isMounted) {
          setQuestionImageUrl(imageURL || null);
        }
      } catch (error) {
        console.error('Error fetching question image:', error);
        if (isMounted) {
          setQuestionImageUrl(null);
        }
      }
    };

    if (showQuestion) {
      fetchQuestionImage();
    }

    return () => {
      isMounted = false;
    };
  }, [showQuestion, questionsPerParagraph, currentParagraphIndex]);

  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      try {
        const currentParagraph = paragraphs[currentParagraphIndex];
        if (!currentParagraph) return;

        const imageURL = await ParagraphController.GetImage(currentParagraph.id);

        if (isMounted) {
          setParagraphImageUrl(imageURL || null);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
        if (isMounted) {
          setParagraphImageUrl(null); 
        }
      }
    };

    if (paragraphs.length > 0) {
      fetchImage();
    }

    return () => {
      isMounted = false;
    };
  }, [currentParagraphIndex, paragraphs]);

  useEffect(() => {
    if (articleCompleted) return;
    if (!started || finished) return;
    if (avgReadingSpeed == null || worldRecordWPM == null) return;
    if (!words || words.length === 0) return;

    const wpm = Math.min(parseInt(inputValue), worldRecordWPM);
    const intervalTime = 60000 / wpm;

    if (!startTime) {
      setStartTime(Date.now());
    }

    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => {
        if (prevIndex < words.length) {
          return prevIndex + 1;
        } else {
          clearInterval(interval);
          setFinished(true);

          const endTime = Date.now();
          const timeTaken = (endTime - startTime) / 1000;

          setTimePerParagraph((prevTimes) => {
            const updatedTimes = [...prevTimes];
            updatedTimes[currentParagraphIndex] = timeTaken;
            return updatedTimes;
          });

          return prevIndex;
        }
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [
    started,
    finished,
    inputValue,
    startTime,
    avgReadingSpeed,
    worldRecordWPM,
    words,
    articleCompleted,
    currentParagraphIndex,
  ]);

  useEffect(() => {
    if (articleCompleted) {
      setConfettiActive(true);
    }
  }, [articleCompleted]);

  useEffect(() => {
    const fetchMessages = async () => {

      if (UserManager.getUser() === null) return;
      
      const response = await fetch(
          `${process.env.REACT_APP_API_URL}chat/history`,
          {
            headers: {
              'Authorization': `Bearer ${UserManager.getUser()._token}`,
            },
            credentials: 'include'
          }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages(data.slice(-8).reverse());
      }
    };

    fetchMessages();

  }, []);


  useEffect(() => {
    
    if (UserManager.getUser() === null) return;
    
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(`${process.env.REACT_APP_HUB_URL}`, {accessTokenFactory: () => UserManager.getUser()._token})
        .withAutomaticReconnect()
        .build();

    connection.on("ReceiveMessage", (message) => {
      setMessages((prev) => [message, ...prev].slice(0, 8));
    });

    connection
        .start().catch((err) => {
      console.error("SignalR Connection Error: ", err);
    });

    hubConnection.current = connection;

    return () => {
      if (hubConnection.current) {
        hubConnection.current.stop()
            .catch((err) => console.error("Error stopping connection:", err));
      }
    }

  }, [])

  if (!articleData || paragraphs.length === 0 || questionsPerParagraph.length === 0) {
    return (
      <div style={{ display: 'flex', minHeight: '50vh', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <ThreeDots 
          height="80" 
          width="80" 
          radius="9"
          color="white" 
          ariaLabel="three-dots-loading" 
          visible={true}
        />
      </div>
    );
  }

  // Destructure fields from the loaded article data
  const {
    title,
    categoryTitle: subject,
    author: articleAuthor,
    publisher: articlePublisher,
    url: articleSource,
    addedBy: articleAddedBy
  } = articleData;

  const wordsPerParagraph = paragraphs.map((paragraph) => paragraph.text.split(' ').length);
  const linearToLog = (value) => Math.round(Math.pow(10, value / 100));
  const logToLinear = (value) => Math.round(Math.log10(value) * 100);

  const calculateAverageWPM = () => {
    const correctIndices = answersCorrectness
      .map((isCorrect, index) => (isCorrect ? index : null))
      .filter((index) => index !== null);

    if (correctIndices.length === 0) {
      return null;
    }

    const totalWords = correctIndices.reduce(
      (sum, index) => sum + wordsPerParagraph[index],
      0
    );
    const totalTime = correctIndices.reduce(
      (sum, index) => sum + timePerParagraph[index],
      0
    );

    return totalWords / (totalTime / 60);
  };

  const handleStart = () => {
    setStarted(true);
    setStartTime(Date.now());
  };

  const handleShowQuestion = () => {
    const currentParagraph = paragraphs[currentParagraphIndex];
    if (!currentParagraph?.id) {
      console.error("Missing required fields to create a new paragraph session.");
      return;
    }

    const paragraphText = currentParagraph.text || '';
    const wordsCount = paragraphText.split(' ').length;
    const endTime = Date.now();
    const timeTaken = startTime ? (endTime - startTime) / 1000 : 0;

    setTimePerParagraph((prevTimes) => {
      const updatedTimes = [...prevTimes];
      updatedTimes[currentParagraphIndex] = timeTaken;
      return updatedTimes;
    });

    const wpm = Math.round((60 * wordsCount) / timeTaken);

    const newParagraphSession = new ParagraphSession();
    newParagraphSession.setParagraphId(currentParagraph.id);
    newParagraphSession.setDuration(timeTaken);
    newParagraphSession.setWpm(wpm);
    newParagraphSession.setQuestionSessions([]);

    const updatedParagraphSessions = [...paragraphSessions];
    updatedParagraphSessions[currentParagraphIndex] = newParagraphSession;
    setParagraphSessions(updatedParagraphSessions);

    setShowQuestion(true);
    setQuestionButtonClicked(true);
  };

  const handleQuestionSubmit = (selectedAnswerIndex) => {
    const currentQuestions = questionsPerParagraph[currentParagraphIndex] || [];
    const question = currentQuestions[0]; 
    if (!question) {
      setFeedbackMessage('No question available for this paragraph.');
      return;
    }

    const correctAnswerIndex = question.correctAnswerIndex;
    const isCorrect = selectedAnswerIndex === correctAnswerIndex;

    setAnswersCorrectness((prevAnswers) => {
      if (prevAnswers.length < totalParagraphs) {
        return [...prevAnswers, isCorrect];
      } else {
        return prevAnswers;
      }
    });

    const questionSession = new QuestionSession();
    questionSession.setCorrect(isCorrect);

    const updatedParagraphSessions = [...paragraphSessions];
    const currentParagraphSession = updatedParagraphSessions[currentParagraphIndex];

    if (currentParagraphSession) {
      currentParagraphSession.addQuestionSession(questionSession);
      if (articleSession) {
        articleSession.setParagraphSessions(updatedParagraphSessions);
      } else {
        console.error("ArticleSession not initialized.");
      }

      setParagraphSessions(updatedParagraphSessions);
    } else {
      console.error("ParagraphSession for current paragraph not found.");
      return;
    }

    if (isCorrect) {
      setFeedbackMessage(`${t('exercise.message.correct')}!`);
    } else {
      const correctAnswerText = question.answerChoices[correctAnswerIndex];
      setFeedbackMessage(`${t('exercise.message.incorrect')} '${correctAnswerText}'.`);
    }
  };

  const handleNextParagraphOrQuestion = () => {
    if (currentParagraphIndex < paragraphs.length - 1) {
      setCurrentParagraphIndex(currentParagraphIndex + 1);
      setCurrentWordIndex(0);
      setStarted(false);
      setFinished(false);
      setQuestionButtonClicked(false);
      setShowQuestion(false);
      setFeedbackMessage('');
      setStartTime(Date.now());
    } else {
      setStarted(false);
      setFinished(true);
      setStartTime(null);
      setArticleCompleted(true);

      try {
        if (articleSession) {
          ArticleSessionController.Post(articleSession);
        } else {
          console.error("ArticleSession is not initialized.");
        }
      } catch (error) {
        console.error("Error saving article session:", error);
      }
    }
  };
  

  if (articleCompleted) {
    return (
      <>
        <ConfettiEffect active={confettiActive} />
        <ResultsTableComponent
          timePerParagraph={timePerParagraph}
          wordsPerParagraph={wordsPerParagraph}
          usersWPM={usersWPM}
          answersCorrectness={answersCorrectness}
          calculateAverageWPM={calculateAverageWPM}
          redirectToCategories={redirectToCategories}
        />
        <ArticleInfo
          title={title}
          author={articleAuthor}
          publisher={articlePublisher}
          source={articleSource}
          addedBy={articleAddedBy}
        />
      </>
    );
  }
  
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const user = UserManager.getUser();

    const payload = {
      sender: user._username,
      content: newMessage
    };

      const response = await fetch(
          `${process.env.REACT_APP_API_URL}chat/send`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${user._token}`,
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(payload)
          }
      );

    if (response.ok){
      setNewMessage('');
    }
  }  

  return (
    <>
      {!showQuestion && (
        <>
          <ReadingExerciseComponent
            subject={subject}
            title={title}
            currentParagraphIndex={currentParagraphIndex}
            paragraphs={paragraphs}
            paragraphImageUrl={paragraphImageUrl}
            words={words}
            started={started}
            finished={finished}
            currentWordIndex={currentWordIndex}
            handleStart={handleStart}
            handleShowQuestion={handleShowQuestion}
            inputValue={inputValue}
            setInputValue={setInputValue}
            logToLinear={logToLinear}
            linearToLog={linearToLog}
            worldRecordWPM={worldRecordWPM}
            valuetext={valuetext}
            questionButtonClicked={questionButtonClicked}
          />
          <ArticleInfo
            title={title}
            author={articleAuthor}
            publisher={articlePublisher}
            source={articleSource}
            addedBy={articleAddedBy}
          />
        </>
      )}

      {showQuestion && (questionsPerParagraph[currentParagraphIndex]?.length > 0) && (
        <div className="mainContainer">
          <QuestionComponent
            question={questionsPerParagraph[currentParagraphIndex][0].text}
            options={questionsPerParagraph[currentParagraphIndex][0].answerChoices}
            questionImageUrl={questionImageUrl}
            onSubmit={handleQuestionSubmit}
            currentParagraphIndex={currentParagraphIndex}
          />
        </div>
      )}

      {feedbackMessage && (
        <FeedbackMessage
          feedbackMessage={feedbackMessage}
          currentParagraphIndex={currentParagraphIndex}
          paragraphs={paragraphs}
          handleNextParagraphOrQuestion={handleNextParagraphOrQuestion}
        />
      )}
      {UserManager.getUser() !== null && (
      <button onClick={() => setIsChatVisible(!isChatVisible)} className="chatButton"> Chat </button>
      )}

      {isChatVisible && (
          <div className="chatWindow">
            <input value={newMessage} onChange={e => setNewMessage(e.target.value)} className="chatInput" placeholder="Enter message" maxLength={22}/>

            {messages.map((message, idx) => (
                <div 
                    key={idx} 
                    className={`message ${message.sender === UserManager.getUser()._username ? 'userMessage' : 'othersMessage'}`} 
                    style={{ bottom: `${(idx + 1) * 60}px` }}>
                  
                  <strong>{message.sender}:</strong> {message.content}
                </div>
            ))}
            
            <button className="sendButton" onClick={handleSendMessage}>Send</button>
          </div>
      )}
    </>
  );
};

export default Exercise;
