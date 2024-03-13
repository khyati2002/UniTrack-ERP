import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useContext } from 'react';
import UserContext from '../utils/UserContext';

const localizer = momentLocalizer(moment)

const AppCalendar = () => {

  const { orders } = useContext(UserContext)

 
  const myEventsList = orders.map((order) => {

    const dateString = order.eda;
    const parsedDate = moment(dateString, "DD-MM-YY");

    const year = parsedDate.year(); // Get the year 
    const month = parsedDate.month(); // Get the month 
    const day = parsedDate.date(); // Get the day of the month 

    return {
      title: "Order ID : " + order.id,
      start: new Date(year, month, day),
      end: new Date(year, month, day),
    }
  })


  return <div className='mt-20 flex justify-center h-screen' >
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 700, width: 1000 }}
    />
  </div>
}
export default AppCalendar