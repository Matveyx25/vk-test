import React, { useState } from 'react'
import { Select } from '../UI/Select'
import s from './Form.module.scss'
import { DatePicker, DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

export const Form = () => {
	const [tower, setTower] = useState(null)
	const [floor, setFloor] = useState(null)
	const [room, setRoom] = useState(null)
	const [message, setMessage] = useState('')
	const [date, setDate] = useState<any>(null);
	const [timeRange, setTimeRange] = useState<any>(null);

	const floorOptions = Array.from({ length: 25 }, (_, index) => 3 + index)
	const roomsOptions = Array.from({ length: 10 }, (_, index) => 1 + index)
	const reset = () => {
		setTower(null)
		setFloor(null)
		setRoom(null)
		setMessage('')
		setDate(null)
		setTimeRange(null)
	}

	const submit = () => {
		if(tower && floor && room && message && date && timeRange){
			const result = {
				tower,
				floor,
				room,
				message,
				date,
				timeRange
			}
			console.log(JSON.stringify(result));
		}else{
			alert('Заполните все поля!')
		}
	}


	return (
		<div className={s.formWrapper}>
			<Select options={['A', 'B']} placeholder='Выберите башню' onSelect={(variant) => setTower(variant)} value={tower} />
			<Select options={floorOptions} placeholder='Выберите этаж' onSelect={(variant) => setFloor(variant)} value={floor} />
			<Select options={roomsOptions} placeholder='Выберите переговорку' onSelect={(variant) => setRoom(variant)} value={room} />
			<DatePicker onSelect={(value: any) => setDate(value)} value={date}/>
			<DateRangePicker
				format="HH:mm:ss"
				ranges={[]}
				defaultCalendarValue={[new Date('2022-02-01 00:00:00'), new Date('2022-02-01 00:00:00')]}
				onOk={(value: any) => setTimeRange(value)}
				value={timeRange}
			/>
			<textarea value={message} onChange={(e) => setMessage(e.target.value)}/>
			<button className={s.resetButton} onClick={reset}>ОЧИСТИТЬ</button>
			<button className={s.submitButton} onClick={submit}>ОТПРАВИТЬ</button>
		</div>
	)
}
