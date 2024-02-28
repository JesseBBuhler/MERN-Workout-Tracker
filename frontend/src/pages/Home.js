import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import useAuthContext from "../hooks/useAuthContext";

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  //[] tells it to only fire once when the component is rendered
  useEffect(
    () => {
      //do not make the parameter function of useEffect async. make it the inner fucntion instead
      const fetchWorkouts = async () => {
        const response = await fetch("/api/workouts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: json });
        }
      };

      if (user) {
        fetchWorkouts();
      }
    },
    [dispatch],
    user
  );
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
