import * as React from 'react';
import { useState } from 'react';
import Input from './form/Input';
import { Button } from 'primereact/button';
import { MeetingFala } from '../interfaces/Meeting';
import { useFormContext } from 'react-hook-form';

interface Props{
    meetingText: MeetingFala[];
    setMeetingText: React.Dispatch<React.SetStateAction<MeetingFala[]>>;
}

export const DePara:React.FC<Props> = ({meetingText, setMeetingText}) => {
    const [dePara, setDePara] = useState<string[]>([]);

    const methods = useFormContext();
    const { setValue, watch } = methods;
    
    const SubstituirDePara = () => {
        const mymeetingText = meetingText ?? [];

        mymeetingText.forEach((item) => {
            dePara.forEach((dp) => {
                const regex = new RegExp(dp.split("=")[0], "gi");
                item.text = item.text.replace(regex, dp.split("=")[1]);
            });
        });

        setMeetingText([...mymeetingText]);
    }

    React.useEffect(() => {
        setValue("deparaList", dePara.join(';'));
    }, [dePara]);
    
    const watchDepara = watch('deparaList');
    React.useEffect(() => {
        const arrdepara: string[] = [];
        if (watchDepara !== undefined)
        {
            watchDepara.split(';').forEach((itemDepara:string) => {
                if (itemDepara !== '')
                    arrdepara.push(itemDepara);
            });
            setDePara([...arrdepara]);
        }
    }, [watchDepara]);


    return (
        <>
        <div className="grid">
            <div className="col-5">
                <Input id="utilDepara" name="utilDepara" 
                    label="De-Para (de=para)"  onKeyDown={(ev) => { if (ev.key==='Enter' && ev.currentTarget.value.trim() !== '' && ev.currentTarget.value.indexOf("=")>0) { setDePara([...dePara, ev.currentTarget.value]); setValue('utilDepara', ''); }}} />
            </div>
        </div>

        <ul style={{listStyleType: 'none'}}>
            {dePara.map((item, index) => (
                <li key={index}>
                    <Button label="x" type="button" style={{padding: '0 12px 5px'}} onClick={() => { 
                        const arrDePara = dePara;
                        arrDePara.splice(index, 1);
                        setDePara([...arrDePara]); }
                    }
                    />
                    {item.split("=")[0]} ⟹ {item.split("=")[1]}
                </li>
            ))}
        </ul>
        <Button label="Substituir De/Para" type='button' onClick={SubstituirDePara}/>
        </>
    );
};