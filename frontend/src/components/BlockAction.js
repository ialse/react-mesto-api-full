import Spinner from './Spinner';
function BlockAction({ isLoadingOpen }) {
    return (

        <div className="block-action block-action_active">
            {isLoadingOpen && <Spinner />}
        </div>
    );
}

export default BlockAction;