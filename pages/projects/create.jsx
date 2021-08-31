import TextInput from '@components/textInput';
import Button from '@components/button';
import ColorStyle from '@components/colorStyle';
import Title from '@components/title';
import { useState } from 'react';
import { fetchApi } from '@lib/fetching';
import { getSession } from 'next-auth/client';

function CreateProjectsPage() {
    const [title, setTitle] = useState('');
    const [task, setTask] = useState('');
    const [color, setColor] = useState('green');

    const handlerTitle = (e) => {
        setTitle(e.target.value);
    };
    
    const handlerTask = (e) => {
        setTask(e.target.value);
    };
    
    const handlerChangeColor = (color) => {
        setColor(color);
    };

    const handlerCreateProject = async (e) => {
        e.preventDefault();
    
        const body = {
            title,
            task, 
            color,
        };
    
        const result = await fetchApi('/api/projects', {
            method: 'POST',
            body,
            });
    
        console.log(result);
        };

    return (
        <div className="mx-14 my-5">
            <div className="mb-5">
                <a href="#">Back</a>
            </div>
            <Title>Create New Project</Title>
            <div className="grid grid-cols-12 w-full gap-4 mt-4">
                <form className="flex flex-col col-span-7 gap-10" onSubmit={handlerCreateProject}>
                    <div className="flex flex-col gap-5">
                        <TextInput
                            type="text"
                            id="title"
                            placeholder="Title of the Project"
                            title="Title"
                            value={title}
                            onChange={handlerTitle}
                            required
                        />

                        <TextInput
                            type="text"
                            id="task"
                            placeholder="Task 1"
                            title="Tasks "
                            value={task}
                            onChange={handlerTask}
                            required
                        />

                        <Button typeButton="submit">
                            Create
                        </Button>
                    </div>
                </form>

                <div className="bg-na-light-green col-span-5 h-1/2 p-4">
                    <p>Border Color</p>
                    <ColorStyle colorActive={color} handlerChangeColor={handlerChangeColor} />
                </div>
            </div>
        </div>
    );
    }
    
export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    
    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }
    
    return {
        props: {
            session,
        },
    };
}

export default CreateProjectsPage;