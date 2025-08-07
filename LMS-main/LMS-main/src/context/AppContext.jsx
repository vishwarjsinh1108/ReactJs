// AppContext.js
import { useEffect, useState } from "react";
import { createContext } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppContextProvider = (props) => {

  const currency = import.meta.env.VITE_CURRENCY

  const navigate = useNavigate()

  const [allCourses, setAllCourses] = useState([])
  const [isEducator, setIsEducator] = useState(true)
  const [enrolledCourses, setEnrolledCourses] = useState([])

  //featch all courses
  const featchAllCourses = async () => {
    setAllCourses(dummyCourses)
  }

  //function to calculate average rating of course
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0
    course.courseRatings.forEach(rating => {
      totalRating += rating.rating
    })
    return totalRating / course.courseRatings.length
  }

  //function to calculate course chapter time
  const CalculateChapterTime = (chapter) => {
    let time = 0
    chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] })
  }

  //function to calculate course duration
  const CalculateCourseDuration = (course) => {
    let time = 0

    course.courseContent.map((chapter) => chapter.chapterContent.map(
      (lecture) => time += lecture.lectureDuration
    ))
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] })
  }

  //function to calculate no of lectures in the course
  const CalculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach(chapter => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  }

  //featch user enrolled courses
  const fetchUserEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses)
  }

  useEffect(() => {
    featchAllCourses()
    fetchUserEnrolledCourses()
  }, [])

  // This is the shared value that will be passed to all children
  const value = {
    currency, allCourses, navigate, calculateRating, isEducator, setIsEducator, CalculateNoOfLectures, CalculateCourseDuration, CalculateChapterTime,enrolledCourses,fetchUserEnrolledCourses
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};


//createContext() is a React API that helps you share data globally between components without manually passing props down through every level of the tree.