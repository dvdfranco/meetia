import { Sidebar } from 'primereact/sidebar';
import React from 'react';
import { Meeting } from '../../interfaces/Meeting';
import { format } from 'date-fns';

interface SidebarProps {
    items: Meeting[];
    getMeeting: (item: Meeting) => void;
}

const MeetingList: React.FC<SidebarProps> = ({ items, getMeeting }) => {
 
    return (
        <>
            <h2>Meetings</h2>

            <ul>
                {items.map((item: Meeting) => (
                    <li key={item.id} onClick={() => getMeeting(item)}>{ /* format((item.date ?? new Date()), "yyyy-MM-dd") */} {item.title}</li>
                ))}
            </ul>
        </>
    );
};

export default MeetingList;