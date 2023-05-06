import React, { useEffect, useRef, useState } from 'react'
import s from './Select.module.scss'

type TOption = string | number | null

interface IProps {
  options: TOption[]
  value?: TOption
  placeholder: string
  className?: string

  onSelect(option: any): void
}

export const Select: React.FC<IProps> = (props) => {
	const [isOpen, setIsOpen] = useState(false)
	const selectRef = useRef(null)

	const useOutside = (ref: any) => {
		useEffect(() => {
			const handleClickOutside = (event: any) => {
				if (ref.current && !ref.current.contains(event.target)) {
					setIsOpen(false)
				}
			}
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}

	useOutside(selectRef)


	const { options, value, placeholder, onSelect } = props;

    return (
      <div className={s.select__wrap} ref={selectRef}>
        <div
          className={
            `${s.select}
            ${!value && s.select_placeholder}
						${isOpen && s.select_focus}`
					}
          onClick={() => setIsOpen(prev => prev = !prev)}
					onBlur={() => setIsOpen(false)}
        >
          {
            value ? value : placeholder
          }
          <i className={
						`icon-arrow
            ${s.select__icon}
						${isOpen && s.active}`
          }/>
        </div>
        {
          isOpen &&
          <div className={s.select__dropdown}>
            {
              options.map((option: TOption, index: number) => (
                <div
                  key={'option_' + index}
                  className={s.select__option}
                  onClick={() => {
										onSelect(option)
										setIsOpen(false)
									}}
                >
                  {option}
                </div>
              ))
            }
          </div>
        }
      </div>
    );
}