import React, {useMemo, useRef, useState} from 'react'
import {Select, Spin} from 'antd'
import type {SelectProps} from 'antd/es/select'
import debounce from 'lodash/debounce'
import {UserValue} from '@/data/type'

export interface fieldNames {
    label: string
    value: string
    head: string
}
export interface DebounceSelectProps<ValueType = any>
    extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
    fetchOptions: (search: string) => Promise<ValueType[]>
    debounceTimeout?: number
}

function DebounceSelect<ValueType extends {key?: string; label: React.ReactNode; value: string | number} = any>({
    fetchOptions,
    debounceTimeout = 800,
    ...props
}: DebounceSelectProps<ValueType>) {
    const [fetching, setFetching] = useState(false)
    const [options, setOptions] = useState<ValueType[]>([])
    const fetchRef = useRef(0)

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value: string) => {
            fetchRef.current += 1
            const fetchId = fetchRef.current
            setOptions([])
            setFetching(true)

            fetchOptions(value).then((newOptions) => {
                console.log('newOptions', newOptions)

                if (fetchId !== fetchRef.current) {
                    return
                }

                setOptions(newOptions)
                setFetching(false)
            })
        }

        return debounce(loadOptions, debounceTimeout)
    }, [fetchOptions, debounceTimeout])

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    )
}

async function fetchUserList(username: string): Promise<UserValue[]> {
    console.log('fetching user', username)

    return fetch('https://randomuser.me/api/?results=5')
        .then((response) => response.json())
        .then((body) =>
            body.results.map((user: {name: {first: string; last: string}; login: {username: string}}) => ({
                label: `${user.name.first} ${user.name.last}`,
                value: user.login.username,
                head: 'https://joeschmoe.io/api/v1/random',
            })),
        )
}

export interface UserSelectProps {
    value?: UserValue[]
    onChange?: (value: UserValue[]) => void
}
const App: React.FC<UserSelectProps> = ({onChange, value}) => {
    return (
        <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="选择用户"
            fetchOptions={fetchUserList}
            onChange={(newValue,option) => {
                onChange && onChange(option as UserValue[])
            }}
            style={{width: '100%'}}
        />
    )
}

export default App
