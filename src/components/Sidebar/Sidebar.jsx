import { useEffect, useState } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.scss';

const routes = [
    { title: 'Home', icon: 'fas-solid fa-house', path: '/' },
    { title: 'Sales', icon: 'chart-line', path: '/sales' },
    { title: 'Costs', icon: 'chart-column', path: '/costs' },
    { title: 'Payments', icon: 'wallet', path: '/payments' },
    { title: 'Finances', icon: 'chart-pie', path: '/finances' },
    { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings' },
    { title: 'Support', icon: 'phone-volume', path: '/support' },
];

const Sidebar = ({ color }) => {
    const [isOpened, setIsOpened] = useState(true);
    const [activeRoute, setActiveRoute] = useState('/payments');

    const [showIcon, setShowIcon] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showBottom, setShowBottom] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setShowIcon(true), 100);  // логотип
        const t2 = setTimeout(() => setShowMenu(true), 400);  // верхнее меню
        const t3 = setTimeout(() => setShowBottom(true), 700); // нижнее меню + профиль

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    const toggleSidebar = () => {
        setIsOpened(prev => !prev);
    };

    const goToRoute = (path) => {
        setActiveRoute(path);
    };

    const containerClassnames = classnames(styles.sidebar, {
        [styles.opened]: isOpened,
        [styles['sidebar-light']]: color === 'light',
        [styles['sidebar-dark']]: color === 'dark',
    });

    if (!showIcon) return null;

    return (
        <div className={containerClassnames}>
            <div className={classnames(styles.topSection, showIcon && styles['fade-in'])}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="TensorFlow logo" />
                    <span>TensorFlow</span>
                </div>
                <div
                    className={classnames(
                        styles.toggleButton,
                        isOpened ? styles['toggleButton--opened'] : styles['toggleButton--closed']
                    )}
                    onClick={toggleSidebar}
                >
                    <FontAwesomeIcon icon="angle-left" className={classnames(styles.arrow, {
                        [styles.rotated]: !isOpened
                    })} />
                </div>
            </div>


            <div className={classnames(styles.menuSection, showMenu && styles['fade-in'])}>
                {routes.map(route => (
                    <div
                        key={route.title}
                        onClick={() => goToRoute(route.path)}
                        className={classnames(styles.menuItem, {
                            [styles.active]: activeRoute === route.path
                        })}
                    >
                        <FontAwesomeIcon icon={route.icon} />
                        <span>{route.title}</span>
                    </div>
                ))}
            </div>

            <div className={classnames(styles.bottomSection, showBottom && styles['fade-in'])}>
                {bottomRoutes.map(route => (
                    <div
                        key={route.title}
                        onClick={() => goToRoute(route.path)}
                        className={classnames(styles.menuItem, {
                            [styles.active]: activeRoute === route.path
                        })}
                    >
                        <FontAwesomeIcon icon={route.icon} />
                        <span>{route.title}</span>
                    </div>
                ))}
            </div>

        </div>

    );
};

Sidebar.propTypes = {
    color: PropTypes.string,
};

export default Sidebar;
